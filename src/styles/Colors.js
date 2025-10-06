
colors_js = '''export const Colors = {
  // Primary Colors
  primary: '#6366F1',
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  
  // Secondary Colors
  secondary: '#EC4899',
  secondaryLight: '#F472B6',
  secondaryDark: '#DB2777',
  
  // Accent Colors
  accent: '#F59E0B',
  accentLight: '#FBBF24',
  accentDark: '#D97706',
  
  // Status Colors
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',
  
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',
  
  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',
  
  info: '#3B82F6',
  infoLight: '#60A5FA',
  infoDark: '#2563EB',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Gray Scale
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Semantic Colors
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Border Colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
  
  // Component Colors
  card: '#FFFFFF',
  input: '#F9FAFB',
  placeholder: '#9CA3AF',
  disabled: '#F3F4F6',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Legacy aliases (for backward compatibility)
  gray: '#6B7280',
  lightGray: '#E5E7EB',
  darkGray: '#374151',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// Gradient Definitions
export const Gradients = {
  // Primary Gradients
  primary: ['#6366F1', '#8B5CF6'],
  primaryVertical: ['#6366F1', '#4F46E5'],
  primaryDiagonal: ['#818CF8', '#6366F1', '#4F46E5'],
  
  // Secondary Gradients
  secondary: ['#EC4899', '#F97316'],
  secondaryVertical: ['#EC4899', '#DB2777'],
  
  // Status Gradients
  success: ['#10B981', '#059669'],
  successLight: ['#6EE7B7', '#10B981'],
  
  warning: ['#F59E0B', '#D97706'],
  warningLight: ['#FCD34D', '#F59E0B'],
  
  error: ['#EF4444', '#DC2626'],
  errorLight: ['#FCA5A5', '#EF4444'],
  
  // Special Gradients
  warm: ['#F59E0B', '#EF4444'],
  cool: ['#3B82F6', '#8B5CF6'],
  sunset: ['#F59E0B', '#EC4899', '#8B5CF6'],
  ocean: ['#06B6D4', '#3B82F6', '#6366F1'],
  
  // Neutral Gradients
  gray: ['#F3F4F6', '#E5E7EB'],
  dark: ['#374151', '#1F2937'],
  light: ['#FFFFFF', '#F9FAFB'],
};

// Shadow Definitions
export const Shadows = {
  small: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  extraLarge: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Opacity Levels
export const Opacity = {
  transparent: 0,
  low: 0.1,
  medium: 0.5,
  high: 0.8,
  opaque: 1,
};

// Theme Configuration
export const Theme = {
  light: {
    background: Colors.background,
    surface: Colors.surface,
    text: Colors.text,
    textSecondary: Colors.textSecondary,
    border: Colors.border,
    primary: Colors.primary,
    card: Colors.card,
  },
  dark: {
    background: Colors.gray900,
    surface: Colors.gray800,
    text: Colors.white,
    textSecondary: Colors.gray300,
    border: Colors.gray700,
    primary: Colors.primaryLight,
    card: Colors.gray800,
  },
};

// Helper Functions
export const getColorWithOpacity = (color, opacity) => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const isLightColor = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

export default {
  Colors,
  Gradients,
  Shadows,
  Opacity,
  Theme,
  getColorWithOpacity,
  isLightColor,
};''';

print("✅ Created Colors.js")
print(f"Length: {len(colors_js)} characters")
