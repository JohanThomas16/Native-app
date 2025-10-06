# 4. src/services/api.js - Complete API service
api_js = '''import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_CONFIG = {
  baseURL: __DEV__ 
    ? 'http://localhost:3000/api' // Development
    : 'https://api.aiproductadvisor.com', // Production
  timeout: 15000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  async (config) => {
    try {
      // Add auth token if available
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add user agent
      config.headers['User-Agent'] = 'AIProductAdvisor/1.0.0';

      // Add request timestamp
      config.headers['X-Request-Time'] = new Date().toISOString();

      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.message);

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_CONFIG.baseURL}/auth/refresh`, {
            refreshToken,
          });
          
          const newToken = response.data.accessToken;
          await AsyncStorage.setItem('authToken', newToken);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Redirect to login or clear tokens
        await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
      }
    }

    // Retry logic for network errors
    if (
      error.code === 'NETWORK_ERROR' || 
      error.code === 'ENOTFOUND' ||
      error.response?.status >= 500
    ) {
      const retryCount = originalRequest.__retryCount || 0;
      
      if (retryCount < API_CONFIG.retryAttempts) {
        originalRequest.__retryCount = retryCount + 1;
        
        const delay = API_CONFIG.retryDelay * Math.pow(2, retryCount);
        console.log(`🔄 Retrying request in ${delay}ms (attempt ${retryCount + 1})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    try {
      return await api.get('/products', { params });
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  // Get product by ID
  getProduct: async (id) => {
    try {
      return await api.get(`/products/${id}`);
    } catch (error) {
      throw new Error(`Failed to fetch product ${id}: ${error.message}`);
    }
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    try {
      return await api.get('/products/search', {
        params: { q: query, ...filters }
      });
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    try {
      return await api.get(`/products/category/${categoryId}`, { params });
    } catch (error) {
      throw new Error(`Failed to fetch products by category: ${error.message}`);
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      return await api.get('/products/featured');
    } catch (error) {
      throw new Error(`Failed to fetch featured products: ${error.message}`);
    }
  },

  // Get trending products
  getTrendingProducts: async (limit = 10) => {
    try {
      return await api.get('/products/trending', { params: { limit } });
    } catch (error) {
      throw new Error(`Failed to fetch trending products: ${error.message}`);
    }
  },

  // Submit product rating
  rateProduct: async (productId, rating, review = null) => {
    try {
      return await api.post(`/products/${productId}/rating`, {
        rating,
        review,
      });
    } catch (error) {
      throw new Error(`Failed to rate product: ${error.message}`);
    }
  },
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getCategories: async () => {
    try {
      return await api.get('/categories');
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  },

  // Get category by ID
  getCategory: async (id) => {
    try {
      return await api.get(`/categories/${id}`);
    } catch (error) {
      throw new Error(`Failed to fetch category ${id}: ${error.message}`);
    }
  },

  // Get category statistics
  getCategoryStats: async (id) => {
    try {
      return await api.get(`/categories/${id}/stats`);
    } catch (error) {
      throw new Error(`Failed to fetch category stats: ${error.message}`);
    }
  },
};

// Reviews API
export const reviewsAPI = {
  // Get reviews for a product
  getProductReviews: async (productId, page = 1, limit = 10) => {
    try {
      return await api.get(`/products/${productId}/reviews`, {
        params: { page, limit }
      });
    } catch (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`);
    }
  },

  // Submit a review
  submitReview: async (productId, reviewData) => {
    try {
      return await api.post(`/products/${productId}/reviews`, reviewData);
    } catch (error) {
      throw new Error(`Failed to submit review: ${error.message}`);
    }
  },

  // Update a review
  updateReview: async (reviewId, reviewData) => {
    try {
      return await api.put(`/reviews/${reviewId}`, reviewData);
    } catch (error) {
      throw new Error(`Failed to update review: ${error.message}`);
    }
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    try {
      return await api.delete(`/reviews/${reviewId}`);
    } catch (error) {
      throw new Error(`Failed to delete review: ${error.message}`);
    }
  },

  // Like/unlike a review
  toggleReviewLike: async (reviewId) => {
    try {
      return await api.post(`/reviews/${reviewId}/like`);
    } catch (error) {
      throw new Error(`Failed to toggle review like: ${error.message}`);
    }
  },
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      return await api.get('/user/profile');
    } catch (error) {
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      return await api.put('/user/profile', profileData);
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  },

  // Upload profile picture
  uploadAvatar: async (imageData) => {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName || 'avatar.jpg',
      });

      return await api.post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      throw new Error(`Failed to upload avatar: ${error.message}`);
    }
  },

  // Get user favorites
  getFavorites: async () => {
    try {
      return await api.get('/user/favorites');
    } catch (error) {
      throw new Error(`Failed to fetch favorites: ${error.message}`);
    }
  },

  // Add to favorites
  addToFavorites: async (productId) => {
    try {
      return await api.post('/user/favorites', { productId });
    } catch (error) {
      throw new Error(`Failed to add to favorites: ${error.message}`);
    }
  },

  // Remove from favorites
  removeFromFavorites: async (productId) => {
    try {
      return await api.delete(`/user/favorites/${productId}`);
    } catch (error) {
      throw new Error(`Failed to remove from favorites: ${error.message}`);
    }
  },

  // Get user preferences
  getPreferences: async () => {
    try {
      return await api.get('/user/preferences');
    } catch (error) {
      throw new Error(`Failed to fetch preferences: ${error.message}`);
    }
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    try {
      return await api.put('/user/preferences', preferences);
    } catch (error) {
      throw new Error(`Failed to update preferences: ${error.message}`);
    }
  },

  // Get user activity history
  getActivityHistory: async (page = 1, limit = 20) => {
    try {
      return await api.get('/user/activity', {
        params: { page, limit }
      });
    } catch (error) {
      throw new Error(`Failed to fetch activity history: ${error.message}`);
    }
  },
};

// Authentication API
export const authAPI = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.accessToken) {
        await AsyncStorage.setItem('authToken', response.accessToken);
        if (response.refreshToken) {
          await AsyncStorage.setItem('refreshToken', response.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  // Register
  register: async (userData) => {
    try {
      return await api.post('/auth/register', userData);
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
      await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
    } catch (error) {
      // Clear tokens even if API call fails
      await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
      throw new Error(`Logout failed: ${error.message}`);
    }
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post('/auth/refresh', { refreshToken });
      
      if (response.accessToken) {
        await AsyncStorage.setItem('authToken', response.accessToken);
      }
      
      return response;
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      return await api.post('/auth/forgot-password', { email });
    } catch (error) {
      throw new Error(`Password reset request failed: ${error.message}`);
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      return await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      throw new Error(`Password reset failed: ${error.message}`);
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      return await api.post('/auth/verify-email', { token });
    } catch (error) {
      throw new Error(`Email verification failed: ${error.message}`);
    }
  },
};

// AI Recommendations API
export const aiAPI = {
  // Get AI recommendations
  getRecommendations: async (userPreferences, context = {}) => {
    try {
      return await api.post('/ai/recommendations', {
        preferences: userPreferences,
        context,
      });
    } catch (error) {
      throw new Error(`Failed to get AI recommendations: ${error.message}`);
    }
  },

  // Submit feedback on recommendations
  submitFeedback: async (recommendationId, feedback) => {
    try {
      return await api.post('/ai/feedback', {
        recommendationId,
        feedback,
      });
    } catch (error) {
      throw new Error(`Failed to submit feedback: ${error.message}`);
    }
  },

  // Chat with AI advisor
  chatWithAdvisor: async (message, conversationId = null) => {
    try {
      return await api.post('/ai/chat', {
        message,
        conversationId,
      });
    } catch (error) {
      throw new Error(`AI chat failed: ${error.message}`);
    }
  },
};

// Analytics API
export const analyticsAPI = {
  // Track user event
  trackEvent: async (eventName, eventData = {}) => {
    try {
      return await api.post('/analytics/events', {
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      // Don't throw error for analytics to avoid breaking app flow
      console.warn('Analytics tracking failed:', error.message);
    }
  },

  // Track screen view
  trackScreenView: async (screenName, additionalData = {}) => {
    try {
      return await api.post('/analytics/screen-views', {
        screen: screenName,
        ...additionalData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Screen view tracking failed:', error.message);
    }
  },
};

// Health check
export const healthAPI = {
  // Check API health
  checkHealth: async () => {
    try {
      return await api.get('/health');
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },
};

// Export default api instance
export default api;

// Export all APIs
export {
  api,
  productsAPI,
  categoriesAPI,
  reviewsAPI,
  userAPI,
  authAPI,
  aiAPI,
  analyticsAPI,
  healthAPI,
};''';

print("✅ Created api.js")
print(f"Length: {len(api_js)} characters")
