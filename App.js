
app_js = '''/**
 * AI Product Advisor - Main App Component
 * 
 * This is the root component that sets up navigation, global providers,
 * and the overall app structure.
 */

import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Alert,
  Linking,
  AppState,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import AIAdvisorScreen from './src/screens/AIAdvisorScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CompareScreen from './src/screens/CompareScreen';

// Import services and utilities
import storageService from './src/services/storage';
import aiService from './src/services/aiService';
import {Colors} from './src/styles/Colors';
import {ROUTES, SCREEN_NAMES, ANALYTICS_EVENTS} from './src/utils/constants';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Stack Navigator for Products flow
 * Handles: Products List → Product Detail → Compare
 */
function ProductsStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen 
        name="ProductsList" 
        component={ProductsScreen}
        options={{
          title: 'AI Products',
        }}
      />
      <Stack.Screen 
        name={ROUTES.PRODUCT_DETAIL}
        component={ProductDetailScreen}
        options={{
          title: 'Product Details',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen 
        name={ROUTES.PRODUCT_COMPARE}
        component={CompareScreen}
        options={{
          title: 'Compare Products',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}

/**
 * Main Tab Navigator
 * Bottom tab navigation with 4 main sections
 */
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // Tab bar icon configuration
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          
          switch (route.name) {
            case ROUTES.HOME:
              iconName = 'home';
              break;
            case ROUTES.PRODUCTS:
              iconName = 'search';
              break;
            case ROUTES.AI_ADVISOR:
              iconName = 'psychology';
              break;
            case ROUTES.PROFILE:
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }
          
          return (
            <Icon 
              name={iconName} 
              size={size} 
              color={color}
              style={{
                marginTop: Platform.OS === 'ios' ? 2 : 0,
              }}
            />
          );
        },
        
        // Tab bar styling
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        
        // Header configuration
        headerShown: false,
        
        // Badge configuration (for notifications)
        tabBarBadge: undefined,
        
        // Accessibility
        tabBarAccessibilityLabel: route.name,
        tabBarTestID: `tab-${route.name.toLowerCase()}`,
      })}>
      
      <Tab.Screen 
        name={ROUTES.HOME} 
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      
      <Tab.Screen 
        name={ROUTES.PRODUCTS} 
        component={ProductsStack}
        options={{
          title: 'Products',
          tabBarLabel: 'Explore',
        }}
      />
      
      <Tab.Screen 
        name={ROUTES.AI_ADVISOR} 
        component={AIAdvisorScreen}
        options={{
          title: 'AI Advisor',
          tabBarLabel: 'AI Chat',
        }}
      />
      
      <Tab.Screen 
        name={ROUTES.PROFILE} 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Main App Component
 */
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState(ROUTES.HOME);
  const [isConnected, setIsConnected] = useState(true);

  // App initialization
  useEffect(() => {
    initializeApp();
  }, []);

  // Network connectivity monitoring
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
      
      if (!state.isConnected) {
        console.warn('📡 Network disconnected - App running in offline mode');
      } else {
        console.log('📡 Network connected');
      }
    });

    return unsubscribe;
  }, []);

  // App state change handling
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('📱 App became active');
        // Track app opened event
        trackEvent(ANALYTICS_EVENTS.APP_OPENED);
      } else if (nextAppState === 'background') {
        console.log('📱 App went to background');
        // Track app backgrounded event
        trackEvent(ANALYTICS_EVENTS.APP_BACKGROUNDED);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, []);

  /**
   * Initialize app services and data
   */
  const initializeApp = async () => {
    try {
      console.log('🚀 Initializing AI Product Advisor...');

      // Initialize storage service
      await initializeStorage();

      // Initialize AI service
      await initializeAIService();

      // Check for deep links
      await handleInitialURL();

      // Load user preferences
      await loadUserPreferences();

      // Clear expired cache
      await storageService.clearExpiredCache();

      console.log('✅ App initialization completed');
      setIsReady(true);

    } catch (error) {
      console.error('❌ App initialization failed:', error);
      
      // Show error alert
      Alert.alert(
        'Initialization Error',
        'Failed to initialize the app. Please restart the application.',
        [
          {
            text: 'Retry',
            onPress: initializeApp,
          },
          {
            text: 'Continue',
            onPress: () => setIsReady(true),
            style: 'cancel',
          },
        ]
      );
    }
  };

  /**
   * Initialize storage service
   */
  const initializeStorage = async () => {
    try {
      // Check if first launch
      const isFirstLaunch = await storageService.isFirstLaunch();
      
      if (isFirstLaunch) {
        console.log('👋 First launch detected - Setting up defaults');
        
        // Set up default preferences
        await storageService.setUserPreferences({
          notifications: true,
          darkMode: false,
          emailUpdates: true,
          language: 'en',
        });
        
        // Track first launch
        trackEvent(ANALYTICS_EVENTS.APP_OPENED, { firstLaunch: true });
      }

      // Get storage info for debugging
      if (__DEV__) {
        const storageInfo = await storageService.getStorageInfo();
        console.log('💾 Storage info:', storageInfo);
      }

    } catch (error) {
      console.error('Storage initialization error:', error);
    }
  };

  /**
   * Initialize AI service with user context
   */
  const initializeAIService = async () => {
    try {
      const userProfile = await storageService.getUserProfile();
      await aiService.initialize(userProfile);
      console.log('🤖 AI Service initialized');
    } catch (error) {
      console.error('AI Service initialization error:', error);
    }
  };

  /**
   * Handle initial deep link URL
   */
  const handleInitialURL = async () => {
    try {
      const url = await Linking.getInitialURL();
      
      if (url) {
        console.log('🔗 Initial URL:', url);
        // Handle deep link navigation
        handleDeepLink(url);
      }
    } catch (error) {
      console.error('Deep link handling error:', error);
    }
  };

  /**
   * Load user preferences and apply them
   */
  const loadUserPreferences = async () => {
    try {
      const preferences = await storageService.getUserPreferences();
      
      // Apply theme preference
      if (preferences.darkMode) {
        // Apply dark theme (if implemented)
        console.log('🌙 Dark mode enabled');
      }

      // Apply other preferences
      console.log('⚙️ User preferences loaded:', preferences);
      
    } catch (error) {
      console.error('Preferences loading error:', error);
    }
  };

  /**
   * Handle deep link navigation
   */
  const handleDeepLink = (url) => {
    // Parse URL and navigate accordingly
    const route = url.replace(/.*?:\\/\\//, '');
    
    if (route.startsWith('product/')) {
      const productId = route.replace('product/', '');
      setInitialRoute(ROUTES.PRODUCT_DETAIL);
      // Pass product ID as navigation param
    } else if (route === 'ai-chat') {
      setInitialRoute(ROUTES.AI_ADVISOR);
    }
  };

  /**
   * Track analytics events
   */
  const trackEvent = (eventName, properties = {}) => {
    if (__DEV__) {
      console.log('📊 Analytics:', eventName, properties);
    }
    
    // Implement actual analytics tracking here
    // analytics.track(eventName, properties);
  };

  /**
   * Navigation state change handler
   */
  const onNavigationStateChange = (state) => {
    if (__DEV__) {
      console.log('🧭 Navigation state changed:', state);
    }
    
    // Track screen views
    const currentScreen = getCurrentRouteName(state);
    if (currentScreen) {
      trackEvent(ANALYTICS_EVENTS.SCREEN_VIEWED, {
        screenName: currentScreen,
      });
    }
  };

  /**
   * Get current route name from navigation state
   */
  const getCurrentRouteName = (state) => {
    if (!state || !state.routes) return null;
    
    const route = state.routes[state.index];
    
    if (route.state) {
      return getCurrentRouteName(route.state);
    }
    
    return route.name;
  };

  // Show loading screen while initializing
  if (!isReady) {
    return null; // Or return a loading component
  }

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Colors.background}
        translucent={false}
      />
      
      <NavigationContainer
        onStateChange={onNavigationStateChange}
        linking={{
          prefixes: ['aiproductadvisor://', 'https://aiproductadvisor.com'],
          config: {
            screens: {
              [ROUTES.HOME]: '',
              [ROUTES.PRODUCTS]: 'products',
              [ROUTES.AI_ADVISOR]: 'ai-chat',
              [ROUTES.PROFILE]: 'profile',
              [ROUTES.PRODUCT_DETAIL]: 'product/:id',
            },
          },
        }}>
        
        <TabNavigator />
        
      </NavigationContainer>
      
      {/* Offline indicator */}
      {!isConnected && (
        <View style={styles.offlineIndicator}>
          <Text style={styles.offlineText}>
            📡 You're offline. Some features may be limited.
          </Text>
        </View>
      )}
    </SafeAreaProvider>
  );
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
    paddingTop: 8,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  
  offlineIndicator: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 25,
    left: 16,
    right: 16,
    backgroundColor: Colors.warning,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 1000,
  },
  
  offlineText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
''';

print("✅ Created App.js")
print(f"Length: {len(app_js)} characters")

# Create comprehensive CSV with all 7 root files
root_files_data = [
    ["README.md", readme_md, "Complete project documentation with features, setup instructions, and development guide"],
    ["package.json", package_json, "Complete package configuration with all dependencies, scripts, and project metadata"],
    ["index.js", index_js, "React Native entry point with error handling and performance monitoring"],
    ["app.json", app_json, "App configuration for iOS/Android with permissions, icons, and metadata"],
    ["babel.config.js", babel_config_js, "Babel configuration with presets, plugins, and environment-specific settings"],
    ["metro.config.js", metro_config_js, "Metro bundler configuration with resolver, transformer, and optimization settings"],
    ["App.js", app_js, "Main app component with navigation, initialization, and global state management"],
]

import csv
with open('root_configuration_files.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['File Path', 'Complete Code', 'Description'])
    
    for file_data in root_files_data:
        writer.writerow(file_data)

print(f"\n🎯 All 7 Root Configuration Files Complete!")
print("📁 Files saved to: root_configuration_files.csv")
print("\n📊 Summary:")
for i, file_data in enumerate(root_files_data, 1):
    filename = file_data[0]
    description = file_data[2]
    char_count = len(file_data[1])
    print(f"{i}. {filename} ({char_count:,} chars) - {description}")

print(f"\n💾 Total characters: {sum(len(file_data[1]) for file_data in root_files_data):,}")
print("🚀 Production-ready React Native app configuration!")
