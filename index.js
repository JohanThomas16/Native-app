
index_js = '''/**
 * AI Product Advisor - React Native App Entry Point
 * 
 * This is the main entry point for the React Native app.
 * It registers the main App component with the React Native runtime.
 * 
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Configure global error handling and warnings
if (__DEV__) {
  // Ignore specific warnings in development
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews',
    'Warning: Cannot update a component',
    'Require cycle:',
    'Remote debugger',
  ]);
  
  // Enable Flipper integration in development
  if (global.__FLIPPER__) {
    console.log('🔍 Flipper debugging enabled');
  }
}

// Global error handler
const originalHandler = ErrorUtils.getGlobalHandler();
const globalHandler = (error, isFatal) => {
  // Log error for debugging
  console.error('🚨 Global Error:', error);
  
  if (__DEV__) {
    // Show error in development
    console.log('Error details:', {
      message: error.message,
      stack: error.stack,
      isFatal,
    });
  } else {
    // Report to crash analytics in production
    // crashlytics().recordError(error);
  }
  
  // Call original handler
  originalHandler(error, isFatal);
};

ErrorUtils.setGlobalHandler(globalHandler);

// Register the main application component
AppRegistry.registerComponent(appName, () => App);

// Additional app initialization
console.log(`🚀 AI Product Advisor v${require('./package.json').version} starting...`);

// Performance monitoring (development only)
if (__DEV__) {
  const start = Date.now();
  
  // Log app startup time
  setTimeout(() => {
    const startupTime = Date.now() - start;
    console.log(`⚡ App startup completed in ${startupTime}ms`);
  }, 0);
}

// Export for testing purposes
export {App};
''';

# 4. app.json - App configuration
app_json = '''{
  "name": "AIProductAdvisor",
  "displayName": "AI Product Advisor",
  "description": "Discover and compare the best AI products with intelligent recommendations",
  "version": "1.0.0",
  "versionCode": 100,
  "bundleId": "com.aiproductadvisor.app",
  "package": "com.aiproductadvisor.app",
  "slug": "ai-product-advisor",
  "privacy": "public",
  "platforms": ["ios", "android"],
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#6366F1"
  },
  "updates": {
    "fallbackToCacheTimeout": 0,
    "url": "https://u.expo.dev/your-project-id"
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "bundleIdentifier": "com.aiproductadvisor.app",
    "buildNumber": "1.0.0",
    "supportsTablet": true,
    "infoPlist": {
      "CFBundleDisplayName": "AI Product Advisor",
      "NSCameraUsageDescription": "This app uses camera to capture images for profile pictures and product photos.",
      "NSPhotoLibraryUsageDescription": "This app accesses photo library to select images for profile pictures.",
      "NSLocationWhenInUseUsageDescription": "This app uses location to provide personalized product recommendations based on your region.",
      "NSUserTrackingUsageDescription": "This app tracks user activity to provide personalized recommendations and improve user experience."
    },
    "config": {
      "usesNonExemptEncryption": false
    }
  },
  "android": {
    "package": "com.aiproductadvisor.app",
    "versionCode": 100,
    "compileSdkVersion": 34,
    "targetSdkVersion": 34,
    "minSdkVersion": 21,
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#6366F1"
    },
    "permissions": [
      "android.permission.INTERNET",
      "android.permission.ACCESS_NETWORK_STATE",
      "android.permission.CAMERA",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.VIBRATE",
      "android.permission.RECEIVE_BOOT_COMPLETED",
      "android.permission.WAKE_LOCK"
    ]
  },
  "web": {
    "favicon": "./assets/favicon.png",
    "bundler": "metro"
  },
  "scheme": "aiproductadvisor",
  "userInterfaceStyle": "automatic",
  "notification": {
    "icon": "./assets/notification-icon.png",
    "color": "#6366F1",
    "androidMode": "default",
    "androidCollapsedTitle": "New AI Product Updates"
  },
  "extra": {
    "eas": {
      "projectId": "your-eas-project-id"
    }
  },
  "owner": "your-expo-username",
  "runtimeVersion": {
    "policy": "sdkVersion"
  }
}''';

print("✅ Created index.js and app.json")
print(f"index.js length: {len(index_js)} characters")
print(f"app.json length: {len(app_json)} characters")
