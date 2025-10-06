# 5. src/services/storage.js - Complete storage service
storage_js = '''import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys constants
export const STORAGE_KEYS = {
  // Authentication
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_PROFILE: 'userProfile',
  
  // User preferences
  USER_PREFERENCES: 'userPreferences',
  THEME_PREFERENCE: 'themePreference',
  NOTIFICATION_SETTINGS: 'notificationSettings',
  LANGUAGE_PREFERENCE: 'languagePreference',
  
  // App data
  FAVORITES: 'favorites',
  RECENT_SEARCHES: 'recentSearches',
  COMPARISON_HISTORY: 'comparisonHistory',
  PRODUCT_CACHE: 'productCache',
  CATEGORIES_CACHE: 'categoriesCache',
  
  // App state
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  FIRST_LAUNCH: 'firstLaunch',
  APP_VERSION: 'appVersion',
  LAST_SYNC: 'lastSync',
  
  // Analytics
  USER_ANALYTICS: 'userAnalytics',
  SESSION_DATA: 'sessionData',
  
  // Offline data
  OFFLINE_QUEUE: 'offlineQueue',
  CACHED_RESPONSES: 'cachedResponses',
};

// Storage service class
class StorageService {
  constructor() {
    this.prefix = '@AIProductAdvisor:';
  }

  // Private helper to get prefixed key
  _getKey(key) {
    return `${this.prefix}${key}`;
  }

  // Generic storage methods
  async setItem(key, value) {
    try {
      const prefixedKey = this._getKey(key);
      const serializedValue = JSON.stringify({
        data: value,
        timestamp: new Date().toISOString(),
        version: '1.0',
      });
      
      await AsyncStorage.setItem(prefixedKey, serializedValue);
      console.log(`📦 Stored: ${key}`);
      return true;
    } catch (error) {
      console.error(`❌ Storage error (setItem): ${key}`, error);
      return false;
    }
  }

  async getItem(key, defaultValue = null) {
    try {
      const prefixedKey = this._getKey(key);
      const serializedValue = await AsyncStorage.getItem(prefixedKey);
      
      if (serializedValue === null) {
        return defaultValue;
      }

      const parsedValue = JSON.parse(serializedValue);
      
      // Handle legacy data without wrapper
      if (parsedValue && typeof parsedValue === 'object' && parsedValue.data !== undefined) {
        return parsedValue.data;
      }
      
      // Return legacy data as-is
      return parsedValue;
    } catch (error) {
      console.error(`❌ Storage error (getItem): ${key}`, error);
      return defaultValue;
    }
  }

  async removeItem(key) {
    try {
      const prefixedKey = this._getKey(key);
      await AsyncStorage.removeItem(prefixedKey);
      console.log(`🗑️ Removed: ${key}`);
      return true;
    } catch (error) {
      console.error(`❌ Storage error (removeItem): ${key}`, error);
      return false;
    }
  }

  async getAllKeys() {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      return allKeys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.replace(this.prefix, ''));
    } catch (error) {
      console.error('❌ Storage error (getAllKeys)', error);
      return [];
    }
  }

  async clear() {
    try {
      const keys = await this.getAllKeys();
      const prefixedKeys = keys.map(key => this._getKey(key));
      await AsyncStorage.multiRemove(prefixedKeys);
      console.log('🧹 Cleared all app storage');
      return true;
    } catch (error) {
      console.error('❌ Storage error (clear)', error);
      return false;
    }
  }

  async getSize() {
    try {
      const keys = await this.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(this._getKey(key));
        if (value) {
          totalSize += value.length;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('❌ Storage error (getSize)', error);
      return 0;
    }
  }

  // Authentication methods
  async setAuthToken(token) {
    return await this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  async getAuthToken() {
    return await this.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async setRefreshToken(token) {
    return await this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  async getRefreshToken() {
    return await this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async clearAuthTokens() {
    await this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    return true;
  }

  // User profile methods
  async setUserProfile(profile) {
    return await this.setItem(STORAGE_KEYS.USER_PROFILE, profile);
  }

  async getUserProfile() {
    return await this.getItem(STORAGE_KEYS.USER_PROFILE);
  }

  async updateUserProfile(updates) {
    const currentProfile = await this.getUserProfile() || {};
    const updatedProfile = { ...currentProfile, ...updates };
    return await this.setUserProfile(updatedProfile);
  }

  // User preferences methods
  async getUserPreferences() {
    const defaultPreferences = {
      notifications: true,
      darkMode: false,
      emailUpdates: true,
      language: 'en',
      autoSync: true,
      analytics: true,
      crashReporting: true,
    };
    
    const preferences = await this.getItem(STORAGE_KEYS.USER_PREFERENCES, defaultPreferences);
    return { ...defaultPreferences, ...preferences };
  }

  async setUserPreferences(preferences) {
    return await this.setItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  async updateUserPreferences(updates) {
    const currentPreferences = await this.getUserPreferences();
    const updatedPreferences = { ...currentPreferences, ...updates };
    return await this.setUserPreferences(updatedPreferences);
  }

  // Theme methods
  async getThemePreference() {
    return await this.getItem(STORAGE_KEYS.THEME_PREFERENCE, 'light');
  }

  async setThemePreference(theme) {
    return await this.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
  }

  // Notification settings
  async getNotificationSettings() {
    const defaultSettings = {
      pushNotifications: true,
      emailNotifications: true,
      weeklyUpdates: true,
      productAlerts: true,
      marketingEmails: false,
      soundEnabled: true,
      vibrationEnabled: true,
    };
    
    const settings = await this.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, defaultSettings);
    return { ...defaultSettings, ...settings };
  }

  async setNotificationSettings(settings) {
    return await this.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, settings);
  }

  // Favorites methods
  async getFavorites() {
    return await this.getItem(STORAGE_KEYS.FAVORITES, []);
  }

  async addToFavorites(productId) {
    const favorites = await this.getFavorites();
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      await this.setItem(STORAGE_KEYS.FAVORITES, favorites);
      console.log(`⭐ Added to favorites: ${productId}`);
      return true;
    }
    return false;
  }

  async removeFromFavorites(productId) {
    const favorites = await this.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== productId);
    await this.setItem(STORAGE_KEYS.FAVORITES, updatedFavorites);
    console.log(`💔 Removed from favorites: ${productId}`);
    return true;
  }

  async isFavorite(productId) {
    const favorites = await this.getFavorites();
    return favorites.includes(productId);
  }

  async toggleFavorite(productId) {
    const isFav = await this.isFavorite(productId);
    if (isFav) {
      return await this.removeFromFavorites(productId);
    } else {
      return await this.addToFavorites(productId);
    }
  }

  // Recent searches methods
  async getRecentSearches() {
    return await this.getItem(STORAGE_KEYS.RECENT_SEARCHES, []);
  }

  async addRecentSearch(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) return false;
    
    const searches = await this.getRecentSearches();
    const normalizedTerm = searchTerm.trim().toLowerCase();
    
    // Remove if already exists
    const filteredSearches = searches.filter(
      term => term.toLowerCase() !== normalizedTerm
    );
    
    // Add to beginning
    filteredSearches.unshift(searchTerm.trim());
    
    // Keep only last 20 searches
    const recentSearches = filteredSearches.slice(0, 20);
    
    return await this.setItem(STORAGE_KEYS.RECENT_SEARCHES, recentSearches);
  }

  async clearRecentSearches() {
    return await this.setItem(STORAGE_KEYS.RECENT_SEARCHES, []);
  }

  // Comparison history methods
  async getComparisonHistory() {
    return await this.getItem(STORAGE_KEYS.COMPARISON_HISTORY, []);
  }

  async addToComparisonHistory(comparison) {
    const history = await this.getComparisonHistory();
    
    const comparisonEntry = {
      ...comparison,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    history.unshift(comparisonEntry);
    
    // Keep only last 50 comparisons
    const recentHistory = history.slice(0, 50);
    
    return await this.setItem(STORAGE_KEYS.COMPARISON_HISTORY, recentHistory);
  }

  async clearComparisonHistory() {
    return await this.setItem(STORAGE_KEYS.COMPARISON_HISTORY, []);
  }

  // Cache methods
  async setCachedData(key, data, expirationMinutes = 60) {
    const cacheEntry = {
      data,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + expirationMinutes * 60 * 1000).toISOString(),
    };
    
    return await this.setItem(key, cacheEntry);
  }

  async getCachedData(key) {
    const cacheEntry = await this.getItem(key);
    
    if (!cacheEntry || !cacheEntry.expiresAt) {
      return null;
    }
    
    const now = new Date();
    const expiresAt = new Date(cacheEntry.expiresAt);
    
    if (now > expiresAt) {
      await this.removeItem(key);
      return null;
    }
    
    return cacheEntry.data;
  }

  async clearExpiredCache() {
    try {
      const keys = await this.getAllKeys();
      const now = new Date();
      
      for (const key of keys) {
        const value = await this.getItem(key);
        if (value && value.expiresAt) {
          const expiresAt = new Date(value.expiresAt);
          if (now > expiresAt) {
            await this.removeItem(key);
            console.log(`🧹 Cleared expired cache: ${key}`);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error clearing expired cache:', error);
    }
  }

  // App state methods
  async isOnboardingCompleted() {
    return await this.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
  }

  async setOnboardingCompleted(completed = true) {
    return await this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
  }

  async isFirstLaunch() {
    const isFirst = await this.getItem(STORAGE_KEYS.FIRST_LAUNCH, true);
    if (isFirst) {
      await this.setItem(STORAGE_KEYS.FIRST_LAUNCH, false);
    }
    return isFirst;
  }

  async getAppVersion() {
    return await this.getItem(STORAGE_KEYS.APP_VERSION);
  }

  async setAppVersion(version) {
    return await this.setItem(STORAGE_KEYS.APP_VERSION, version);
  }

  // Offline queue methods
  async addToOfflineQueue(request) {
    const queue = await this.getItem(STORAGE_KEYS.OFFLINE_QUEUE, []);
    queue.push({
      ...request,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    return await this.setItem(STORAGE_KEYS.OFFLINE_QUEUE, queue);
  }

  async getOfflineQueue() {
    return await this.getItem(STORAGE_KEYS.OFFLINE_QUEUE, []);
  }

  async clearOfflineQueue() {
    return await this.setItem(STORAGE_KEYS.OFFLINE_QUEUE, []);
  }

  async removeFromOfflineQueue(requestId) {
    const queue = await this.getOfflineQueue();
    const updatedQueue = queue.filter(request => request.id !== requestId);
    return await this.setItem(STORAGE_KEYS.OFFLINE_QUEUE, updatedQueue);
  }

  // Debug methods
  async getStorageInfo() {
    try {
      const keys = await this.getAllKeys();
      const size = await this.getSize();
      
      return {
        totalKeys: keys.length,
        totalSize: size,
        sizeInKB: Math.round(size / 1024),
        keys: keys,
      };
    } catch (error) {
      console.error('❌ Error getting storage info:', error);
      return null;
    }
  }

  async exportData() {
    try {
      const keys = await this.getAllKeys();
      const data = {};
      
      for (const key of keys) {
        data[key] = await this.getItem(key);
      }
      
      return {
        exportDate: new Date().toISOString(),
        version: '1.0',
        data,
      };
    } catch (error) {
      console.error('❌ Error exporting data:', error);
      return null;
    }
  }

  async importData(exportedData) {
    try {
      if (!exportedData || !exportedData.data) {
        throw new Error('Invalid export data format');
      }
      
      for (const [key, value] of Object.entries(exportedData.data)) {
        await this.setItem(key, value);
      }
      
      console.log('✅ Data imported successfully');
      return true;
    } catch (error) {
      console.error('❌ Error importing data:', error);
      return false;
    }
  }
}

// Create and export singleton instance
const storageService = new StorageService();

export default storageService;

// Also export the class for custom instances if needed
export { StorageService, STORAGE_KEYS };''';

print("✅ Created storage.js")
print(f"Length: {len(storage_js)} characters")
