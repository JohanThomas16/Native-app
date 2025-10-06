
constants_js = '''// App Configuration and Constants

// App Information
export const APP_INFO = {
  name: 'AI Product Advisor',
  version: '1.0.0',
  build: '100',
  description: 'Discover and compare the best AI products for your needs',
  author: 'AI Product Advisor Team',
  website: 'https://aiproductadvisor.com',
  supportEmail: 'support@aiproductadvisor.com',
  privacyPolicy: 'https://aiproductadvisor.com/privacy',
  termsOfService: 'https://aiproductadvisor.com/terms',
};

// Environment Configuration
export const ENV_CONFIG = {
  development: {
    apiBaseUrl: 'http://localhost:3000/api',
    websocketUrl: 'ws://localhost:3000',
    enableLogging: true,
    enableAnalytics: false,
    enableCrashReporting: false,
  },
  staging: {
    apiBaseUrl: 'https://staging-api.aiproductadvisor.com',
    websocketUrl: 'wss://staging-api.aiproductadvisor.com',
    enableLogging: true,
    enableAnalytics: true,
    enableCrashReporting: true,
  },
  production: {
    apiBaseUrl: 'https://api.aiproductadvisor.com',
    websocketUrl: 'wss://api.aiproductadvisor.com',
    enableLogging: false,
    enableAnalytics: true,
    enableCrashReporting: true,
  },
};

// API Configuration
export const API_CONFIG = {
  timeout: 15000,
  retryAttempts: 3,
  retryDelay: 1000,
  maxRetryDelay: 5000,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
  requestTimeout: 30000,
  uploadTimeout: 60000,
  batchSize: 50,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verify: '/auth/verify',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/change-password',
  },
  
  // User Management
  user: {
    profile: '/user/profile',
    preferences: '/user/preferences',
    favorites: '/user/favorites',
    history: '/user/history',
    analytics: '/user/analytics',
    avatar: '/user/avatar',
    delete: '/user/delete',
  },
  
  // Products
  products: {
    list: '/products',
    detail: '/products/:id',
    search: '/products/search',
    featured: '/products/featured',
    trending: '/products/trending',
    categories: '/products/categories',
    compare: '/products/compare',
    reviews: '/products/:id/reviews',
    rating: '/products/:id/rating',
  },
  
  // Categories
  categories: {
    list: '/categories',
    detail: '/categories/:id',
    products: '/categories/:id/products',
    stats: '/categories/:id/stats',
  },
  
  // AI Services
  ai: {
    chat: '/ai/chat',
    recommendations: '/ai/recommendations',
    feedback: '/ai/feedback',
    analyze: '/ai/analyze',
  },
  
  // Analytics
  analytics: {
    events: '/analytics/events',
    screenViews: '/analytics/screen-views',
    userBehavior: '/analytics/user-behavior',
  },
  
  // System
  system: {
    health: '/health',
    version: '/version',
    status: '/status',
  },
};

// Navigation Routes
export const ROUTES = {
  // Main Navigation
  HOME: 'Home',
  PRODUCTS: 'Products',
  AI_ADVISOR: 'AI Advisor',
  PROFILE: 'Profile',
  
  // Product Navigation
  PRODUCT_DETAIL: 'ProductDetail',
  PRODUCT_COMPARE: 'Compare',
  PRODUCT_REVIEWS: 'Reviews',
  
  // User Navigation
  SETTINGS: 'Settings',
  FAVORITES: 'Favorites',
  HISTORY: 'History',
  
  // Auth Navigation
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  
  // Utility Navigation
  SEARCH: 'Search',
  WEB_VIEW: 'WebView',
  ONBOARDING: 'Onboarding',
};

// Screen Names for Analytics
export const SCREEN_NAMES = {
  HOME_SCREEN: 'HomeScreen',
  PRODUCTS_SCREEN: 'ProductsScreen',
  PRODUCT_DETAIL_SCREEN: 'ProductDetailScreen',
  AI_ADVISOR_SCREEN: 'AIAdvisorScreen',
  COMPARE_SCREEN: 'CompareScreen',
  PROFILE_SCREEN: 'ProfileScreen',
  SETTINGS_SCREEN: 'SettingsScreen',
  FAVORITES_SCREEN: 'FavoritesScreen',
  SEARCH_SCREEN: 'SearchScreen',
  LOGIN_SCREEN: 'LoginScreen',
  REGISTER_SCREEN: 'RegisterScreen',
  ONBOARDING_SCREEN: 'OnboardingScreen',
};

// Product Categories
export const PRODUCT_CATEGORIES = {
  AI_ASSISTANTS: {
    id: 1,
    name: 'AI Assistants',
    slug: 'ai-assistants',
    icon: 'psychology',
    color: '#6366F1',
  },
  AI_ART: {
    id: 2,
    name: 'AI Art & Design',
    slug: 'ai-art',
    icon: 'palette',
    color: '#EC4899',
  },
  PRODUCTIVITY: {
    id: 3,
    name: 'Productivity',
    slug: 'productivity',
    icon: 'work',
    color: '#F59E0B',
  },
  DEVELOPMENT: {
    id: 4,
    name: 'Development',
    slug: 'development',
    icon: 'code',
    color: '#10B981',
  },
  WRITING: {
    id: 5,
    name: 'Writing & Content',
    slug: 'writing',
    icon: 'edit',
    color: '#8B5CF6',
  },
  ANALYTICS: {
    id: 6,
    name: 'Analytics & Insights',
    slug: 'analytics',
    icon: 'analytics',
    color: '#06B6D4',
  },
};

// Sort and Filter Options
export const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular', icon: 'trending-up' },
  { label: 'Highest Rated', value: 'rating', icon: 'star' },
  { label: 'Most Reviews', value: 'reviews', icon: 'chat' },
  { label: 'Price: Low to High', value: 'price_asc', icon: 'arrow-upward' },
  { label: 'Price: High to Low', value: 'price_desc', icon: 'arrow-downward' },
  { label: 'Newest First', value: 'newest', icon: 'new-releases' },
  { label: 'A-Z', value: 'name_asc', icon: 'sort-by-alpha' },
  { label: 'Z-A', value: 'name_desc', icon: 'sort-by-alpha' },
];

export const FILTER_OPTIONS = {
  priceRanges: [
    { label: 'Free', value: 'free', min: 0, max: 0 },
    { label: 'Under $10', value: '0-10', min: 0, max: 10 },
    { label: '$10 - $25', value: '10-25', min: 10, max: 25 },
    { label: '$25 - $50', value: '25-50', min: 25, max: 50 },
    { label: '$50 - $100', value: '50-100', min: 50, max: 100 },
    { label: '$100+', value: '100+', min: 100, max: Infinity },
  ],
  
  ratings: [
    { label: '4.5+ Stars', value: '4.5+', min: 4.5 },
    { label: '4.0+ Stars', value: '4.0+', min: 4.0 },
    { label: '3.5+ Stars', value: '3.5+', min: 3.5 },
    { label: '3.0+ Stars', value: '3.0+', min: 3.0 },
    { label: 'Any Rating', value: 'any', min: 0 },
  ],
  
  features: [
    { label: 'Free Trial', value: 'free_trial', key: 'freeTrial' },
    { label: 'Free Version', value: 'free_version', key: 'freeVersion' },
    { label: 'API Access', value: 'api_access', key: 'apiAccess' },
    { label: 'Mobile App', value: 'mobile_app', key: 'mobileApp' },
    { label: 'Team Features', value: 'team_features', key: 'teamFeatures' },
    { label: 'Commercial Use', value: 'commercial_use', key: 'commercialUse' },
    { label: 'Open Source', value: 'open_source', key: 'openSource' },
  ],
  
  platforms: [
    { label: 'Web', value: 'web' },
    { label: 'iOS', value: 'ios' },
    { label: 'Android', value: 'android' },
    { label: 'Desktop', value: 'desktop' },
    { label: 'API', value: 'api' },
  ],
  
  businessModels: [
    { label: 'Freemium', value: 'freemium' },
    { label: 'Subscription', value: 'subscription' },
    { label: 'One-time Purchase', value: 'one-time' },
    { label: 'Usage-based', value: 'usage-based' },
    { label: 'Free', value: 'free' },
  ],
};

// User Preferences Default Values
export const DEFAULT_PREFERENCES = {
  // Notifications
  notifications: {
    push: true,
    email: true,
    marketing: false,
    product_updates: true,
    weekly_digest: true,
    breaking_news: true,
  },
  
  // Display
  display: {
    theme: 'light', // 'light', 'dark', 'auto'
    language: 'en',
    currency: 'USD',
    timezone: 'auto',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'US',
  },
  
  // Privacy
  privacy: {
    analytics: true,
    crashReporting: true,
    personalization: true,
    dataSaving: false,
    locationServices: false,
  },
  
  // Content
  content: {
    adultContent: false,
    explicitLanguage: false,
    autoplay: true,
    highQualityImages: true,
  },
  
  // Performance
  performance: {
    cacheEnabled: true,
    offlineMode: false,
    dataCompression: true,
    backgroundSync: true,
  },
};

// Validation Rules
export const VALIDATION_RULES = {
  email: {
    pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    message: 'Please enter a valid email address',
  },
  
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  },
  
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: 'Username must be 3-20 characters, letters, numbers, and underscores only',
  },
  
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\\s]+$/,
    message: 'Name must be 2-50 characters, letters and spaces only',
  },
  
  phone: {
    pattern: /^[\\+]?[(]?[\\d\\s\\-\\(\\)]{10,}$/,
    message: 'Please enter a valid phone number',
  },
  
  url: {
    pattern: /^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$/,
    message: 'Please enter a valid URL',
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  // Network Errors
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  CONNECTION_LOST: 'Connection lost. Please check your internet connection.',
  
  // Authentication Errors
  INVALID_CREDENTIALS: 'Invalid email or password.',
  ACCOUNT_LOCKED: 'Account temporarily locked. Try again later.',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  EMAIL_NOT_VERIFIED: 'Please verify your email address.',
  
  // Validation Errors
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password does not meet requirements.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  INVALID_URL: 'Please enter a valid URL.',
  
  // Generic Errors
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  NOT_FOUND: 'The requested resource was not found.',
  FORBIDDEN: 'Access forbidden.',
  CONFLICT: 'A conflict occurred. Please try again.',
  RATE_LIMITED: 'Too many requests. Please slow down.',
  
  // Feature-specific Errors
  PRODUCT_NOT_FOUND: 'Product not found.',
  REVIEW_FAILED: 'Failed to submit review. Please try again.',
  FAVORITE_FAILED: 'Failed to update favorites. Please try again.',
  COMPARISON_FAILED: 'Failed to load comparison. Please try again.',
  AI_CHAT_FAILED: 'AI chat temporarily unavailable. Please try again.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  DOWNLOAD_FAILED: 'Download failed. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  REGISTER_SUCCESS: 'Account created successfully!',
  PASSWORD_CHANGED: 'Password changed successfully.',
  EMAIL_VERIFIED: 'Email verified successfully.',
  
  // Profile
  PROFILE_UPDATED: 'Profile updated successfully.',
  PREFERENCES_SAVED: 'Preferences saved successfully.',
  AVATAR_UPDATED: 'Profile picture updated successfully.',
  
  // Products
  FAVORITE_ADDED: 'Added to favorites!',
  FAVORITE_REMOVED: 'Removed from favorites.',
  REVIEW_SUBMITTED: 'Review submitted successfully!',
  REVIEW_UPDATED: 'Review updated successfully.',
  COMPARISON_SAVED: 'Comparison saved successfully.',
  
  // Generic
  SAVE_SUCCESS: 'Changes saved successfully.',
  DELETE_SUCCESS: 'Deleted successfully.',
  COPY_SUCCESS: 'Copied to clipboard.',
  SHARE_SUCCESS: 'Shared successfully.',
  SYNC_SUCCESS: 'Data synced successfully.',
};

// Loading States
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  REFRESHING: 'refreshing',
  UPLOADING: 'uploading',
  DOWNLOADING: 'downloading',
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
    extra_slow: 800,
  },
  
  easings: {
    ease_in: 'ease-in',
    ease_out: 'ease-out',
    ease_in_out: 'ease-in-out',
    linear: 'linear',
  },
  
  spring: {
    tension: 150,
    friction: 8,
    useNativeDriver: true,
  },
};

// Device and Screen Configuration
export const DEVICE_CONFIG = {
  breakpoints: {
    small: 375,
    medium: 768,
    large: 1024,
    xlarge: 1200,
  },
  
  orientation: {
    portrait: 'portrait',
    landscape: 'landscape',
  },
  
  platform: {
    ios: 'ios',
    android: 'android',
    web: 'web',
  },
};

// Limits and Constraints
export const LIMITS = {
  // User Input
  maxSearchLength: 100,
  maxReviewLength: 1000,
  maxCommentLength: 500,
  maxBioLength: 200,
  maxUsernameLength: 20,
  
  // App Behavior
  maxFavorites: 100,
  maxComparisons: 10,
  maxRecentSearches: 20,
  maxChatHistory: 50,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxImageSize: 5 * 1024 * 1024, // 5MB
  
  // Pagination
  defaultPageSize: 20,
  maxPageSize: 100,
  minPageSize: 5,
  
  // Cache
  maxCacheSize: 50 * 1024 * 1024, // 50MB
  maxCacheAge: 24 * 60 * 60 * 1000, // 24 hours
};

// Feature Flags
export const FEATURE_FLAGS = {
  // Core Features
  ENABLE_AI_CHAT: true,
  ENABLE_PRODUCT_COMPARISON: true,
  ENABLE_USER_REVIEWS: true,
  ENABLE_FAVORITES: true,
  ENABLE_OFFLINE_MODE: false,
  
  // UI Features
  ENABLE_DARK_MODE: true,
  ENABLE_ANIMATIONS: true,
  ENABLE_HAPTICS: true,
  ENABLE_SOUNDS: false,
  
  // Advanced Features
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_BIOMETRIC_AUTH: false,
  ENABLE_LOCATION_SERVICES: false,
  ENABLE_CAMERA_ACCESS: true,
  
  // Analytics and Tracking
  ENABLE_ANALYTICS: true,
  ENABLE_CRASH_REPORTING: true,
  ENABLE_PERFORMANCE_MONITORING: true,
  ENABLE_USER_FEEDBACK: true,
  
  // Experimental Features
  ENABLE_VOICE_SEARCH: false,
  ENABLE_AR_FEATURES: false,
  ENABLE_SOCIAL_SHARING: true,
  ENABLE_GAMIFICATION: false,
};

// Social Media and External Links
export const EXTERNAL_LINKS = {
  social: {
    twitter: 'https://twitter.com/aiproductadvisor',
    linkedin: 'https://linkedin.com/company/aiproductadvisor',
    facebook: 'https://facebook.com/aiproductadvisor',
    instagram: 'https://instagram.com/aiproductadvisor',
    youtube: 'https://youtube.com/@aiproductadvisor',
    github: 'https://github.com/aiproductadvisor',
  },
  
  legal: {
    privacy: 'https://aiproductadvisor.com/privacy',
    terms: 'https://aiproductadvisor.com/terms',
    cookies: 'https://aiproductadvisor.com/cookies',
    gdpr: 'https://aiproductadvisor.com/gdpr',
  },
  
  support: {
    help: 'https://help.aiproductadvisor.com',
    contact: 'https://aiproductadvisor.com/contact',
    faq: 'https://aiproductadvisor.com/faq',
    documentation: 'https://docs.aiproductadvisor.com',
  },
  
  appStores: {
    ios: 'https://apps.apple.com/app/ai-product-advisor',
    android: 'https://play.google.com/store/apps/details?id=com.aiproductadvisor',
  },
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  // App Lifecycle
  APP_OPENED: 'app_opened',
  APP_CLOSED: 'app_closed',
  APP_BACKGROUNDED: 'app_backgrounded',
  APP_FOREGROUNDED: 'app_foregrounded',
  
  // User Actions
  USER_REGISTERED: 'user_registered',
  USER_LOGGED_IN: 'user_logged_in',
  USER_LOGGED_OUT: 'user_logged_out',
  PROFILE_UPDATED: 'profile_updated',
  
  // Product Interactions
  PRODUCT_VIEWED: 'product_viewed',
  PRODUCT_SEARCHED: 'product_searched',
  PRODUCT_FAVORITED: 'product_favorited',
  PRODUCT_UNFAVORITED: 'product_unfavorited',
  PRODUCT_REVIEWED: 'product_reviewed',
  PRODUCT_COMPARED: 'product_compared',
  
  // AI Interactions
  AI_CHAT_STARTED: 'ai_chat_started',
  AI_MESSAGE_SENT: 'ai_message_sent',
  AI_RECOMMENDATION_VIEWED: 'ai_recommendation_viewed',
  AI_FEEDBACK_GIVEN: 'ai_feedback_given',
  
  // Navigation
  SCREEN_VIEWED: 'screen_viewed',
  TAB_SWITCHED: 'tab_switched',
  LINK_CLICKED: 'link_clicked',
  
  // Errors
  ERROR_OCCURRED: 'error_occurred',
  CRASH_DETECTED: 'crash_detected',
  NETWORK_ERROR: 'network_error',
};

// Export all constants
export default {
  APP_INFO,
  ENV_CONFIG,
  API_CONFIG,
  API_ENDPOINTS,
  ROUTES,
  SCREEN_NAMES,
  PRODUCT_CATEGORIES,
  SORT_OPTIONS,
  FILTER_OPTIONS,
  DEFAULT_PREFERENCES,
  VALIDATION_RULES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_STATES,
  ANIMATION_CONFIG,
  DEVICE_CONFIG,
  LIMITS,
  FEATURE_FLAGS,
  EXTERNAL_LINKS,
  ANALYTICS_EVENTS,
};''';

print("✅ Created constants.js")
print(f"Length: {len(constants_js)} characters")

# Create comprehensive CSV with all 3 files
data_utils_files = [
    ["src/data/mockData.js", mock_data_js, "Comprehensive mock data including categories, users, reviews, analytics, and onboarding data"],
    ["src/data/products.js", products_js, "Complete product catalog with detailed information, features, pricing, and metadata"],
    ["src/utils/constants.js", constants_js, "Complete app configuration including API endpoints, validation rules, error messages, and feature flags"],
]

import csv
with open('data_and_utils_files.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['File Path', 'Complete Code', 'Description'])
    
    for file_data in data_utils_files:
        writer.writerow(file_data)

print(f"\n🎯 All 3 Data & Utils Files Complete!")
print("📁 Files saved to: data_and_utils_files.csv")
print("\n📊 Summary:")
for i, file_data in enumerate(data_utils_files, 1):
    filename = file_data[0].split('/')[-1]
    description = file_data[2]
    char_count = len(file_data[1])
    print(f"{i}. {filename} ({char_count:,} chars) - {description}")

print(f"\n💾 Total characters: {sum(len(file_data[1]) for file_data in data_utils_files):,}")
print("🚀 Ready for production use!")
