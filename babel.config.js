
babel_config_js = '''/**
 * Babel Configuration for AI Product Advisor
 * 
 * This configuration enables JavaScript transformation for React Native,
 * including support for modern JS features, plugins, and optimizations.
 */

module.exports = {
  presets: [
    // React Native preset with automatic JSX runtime
    ['module:metro-react-native-babel-preset', {
      // Enable automatic JSX runtime (React 17+)
      runtime: 'automatic',
      // Enable development transforms in development
      development: process.env.NODE_ENV === 'development',
    }],
  ],
  
  plugins: [
    // Reanimated plugin (must be last)
    'react-native-reanimated/plugin',
    
    // Optional chaining and nullish coalescing
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    
    // Modern JavaScript features
    '@babel/plugin-proposal-logical-assignment-operators',
    
    // React Native specific optimizations
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    
    // Module resolution for absolute imports
    ['module-resolver', {
      root: ['./src'],
      extensions: [
        '.ios.ts',
        '.android.ts',
        '.native.ts',
        '.ts',
        '.ios.tsx',
        '.android.tsx',
        '.native.tsx',
        '.tsx',
        '.ios.js',
        '.android.js',
        '.native.js',
        '.js',
        '.jsx',
        '.json',
      ],
      alias: {
        '@': './src',
        '@components': './src/components',
        '@screens': './src/screens',
        '@services': './src/services',
        '@utils': './src/utils',
        '@styles': './src/styles',
        '@data': './src/data',
        '@assets': './assets',
      },
    }],
  ],
  
  // Environment-specific configurations
  env: {
    // Development environment
    development: {
      plugins: [
        // Flipper integration for debugging
        ['@babel/plugin-transform-react-jsx-source'],
        ['@babel/plugin-transform-react-jsx-self'],
      ],
    },
    
    // Production environment
    production: {
      plugins: [
        // Remove console statements in production
        ['transform-remove-console', {
          exclude: ['error', 'warn'],
        }],
        
        // Dead code elimination
        ['babel-plugin-transform-remove-undefined'],
        
        // Inline environment variables
        ['transform-inline-environment-variables'],
      ],
    },
    
    // Test environment
    test: {
      presets: [
        ['module:metro-react-native-babel-preset', {
          targets: { node: 'current' },
        }],
      ],
      plugins: [
        // Transform dynamic imports for Jest
        'babel-plugin-dynamic-import-node',
      ],
    },
  },
  
  // Ignore patterns
  ignore: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|react-native-linear-gradient|react-native-reanimated|react-native-gesture-handler|@react-navigation)/)',
  ],
  
  // Source maps for debugging
  sourceMaps: process.env.NODE_ENV === 'development',
  
  // Compact output in production
  compact: process.env.NODE_ENV === 'production',
  
  // Comments handling
  comments: process.env.NODE_ENV === 'development',
};
''';

# 6. metro.config.js - Metro bundler configuration
metro_config_js = '''/**
 * Metro Configuration for AI Product Advisor
 * 
 * Metro is the JavaScript bundler for React Native. This configuration
 * customizes how Metro resolves, transforms, and bundles JavaScript code.
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration object
 */
const config = {
  // Transformer configuration
  transformer: {
    // Enable experimental import support
    unstable_allowRequireContext: true,
    
    // Asset plugins for handling different file types
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    
    // Minifier configuration
    minifierConfig: {
      // Keep function names for better debugging
      keep_fnames: true,
      // Mangle properties for smaller bundle size
      mangle: {
        keep_fnames: true,
      },
      // Output configuration
      output: {
        ascii_only: true,
        quote_keys: true,
        wrap_iife: true,
      },
      // Source map configuration
      sourceMap: {
        includeSources: false,
      },
      // Compression configuration
      compress: {
        reduce_funcs: false,
      },
    },
  },
  
  // Resolver configuration
  resolver: {
    // File extensions to resolve
    assetExts: [
      // Images
      'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg',
      // Fonts
      'ttf', 'otf', 'woff', 'woff2',
      // Audio/Video
      'mp3', 'wav', 'mp4', 'mov', 'avi',
      // Documents
      'pdf', 'html',
      // Other
      'json', 'zip',
    ],
    
    // Source file extensions
    sourceExts: [
      'js', 'jsx', 'ts', 'tsx', 'json',
      'cjs', 'mjs',
    ],
    
    // Platform-specific file extensions
    platforms: ['ios', 'android', 'native', 'web'],
    
    // Alias configuration for absolute imports
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@assets': path.resolve(__dirname, 'assets'),
    },
    
    // Node modules to not resolve as Haste modules
    blockList: [
      // Ignore common problematic modules
      /node_modules\/.*\/Pods\/.*/,
      /.*\/__tests__\/.*/,
      /.*\/\\.git\/.*/,
      /.*\/\\.DS_Store$/,
    ],
    
    // Unstable features
    unstable_enableSymlinks: false,
    unstable_conditionsByPlatform: {
      ios: ['react-native'],
      android: ['react-native'],
      web: ['browser'],
    },
  },
  
  // Serializer configuration
  serializer: {
    // Custom serializer for optimizing bundle
    customSerializer: undefined,
    
    // Module ID factory
    createModuleIdFactory: () => {
      return (path) => {
        // Use shorter module IDs in production
        if (process.env.NODE_ENV === 'production') {
          return path.replace(__dirname, '').replace(/\\/g, '/');
        }
        return path;
      };
    },
    
    // Output configuration
    getRunModuleStatement: (moduleId) => {
      return `__r(${JSON.stringify(moduleId)});`;
    },
  },
  
  // Server configuration
  server: {
    // Port configuration
    port: 8081,
    
    // Enable HTTPS in development
    https: false,
    
    // Rewrite requests for development
    rewriteRequestUrl: (url) => {
      // Handle asset requests
      if (url.includes('/assets/')) {
        return url.replace('/assets/', '/src/assets/');
      }
      return url;
    },
  },
  
  // Watcher configuration
  watcher: {
    // Directories to watch
    watchFolders: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'assets'),
    ],
    
    // Files to ignore
    ignore: [
      /node_modules\/.*\/Pods\/.*/,
      /.*\/__tests__\/.*/,
      /.*\/\\.git\/.*/,
      /.*\/\\.DS_Store$/,
      /.*\/\\.vscode\/.*/,
      /.*\/android\/app\/build\/.*/,
      /.*\/ios\/build\/.*/,
    ],
    
    // Additional watcher options
    additionalExts: ['json', 'ts', 'tsx'],
  },
  
  // Cache configuration
  cacheStores: [
    {
      name: 'FileStore',
      options: {
        cacheDirectory: path.join(__dirname, 'node_modules/.cache/metro'),
      },
    },
  ],
  
  // Reset cache configuration
  resetCache: process.env.NODE_ENV === 'development',
};

// Environment-specific configurations
if (process.env.NODE_ENV === 'production') {
  // Production optimizations
  config.transformer.minifierPath = 'metro-minify-terser';
  config.transformer.minifierConfig = {
    ...config.transformer.minifierConfig,
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info', 'console.debug'],
    },
  };
}

if (process.env.NODE_ENV === 'development') {
  // Development optimizations
  config.transformer.enableBabelRCLookup = true;
  config.transformer.enableBabelRuntime = false;
}

// Merge with default configuration
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
''';

print("✅ Created babel.config.js and metro.config.js")
print(f"babel.config.js length: {len(babel_config_js)} characters")
print(f"metro.config.js length: {len(metro_config_js)} characters")
