
typography_js = '''import {StyleSheet, Platform} from 'react-native';
import {Colors} from './Colors';

// Font Family Configuration
export const FontFamily = {
  regular: Platform.select({
    ios: 'San Francisco',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'San Francisco',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'San Francisco',
    android: 'Roboto-Bold',
    default: 'System',
  }),
  light: Platform.select({
    ios: 'San Francisco',
    android: 'Roboto-Light',
    default: 'System',
  }),
};

// Font Weight Configuration
export const FontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

// Font Size Scale
export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 48,
  '7xl': 60,
  '8xl': 72,
  '9xl': 96,
};

// Line Height Configuration
export const LineHeight = {
  none: 1,
  tight: 1.1,
  snug: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 2,
};

// Typography Styles
export const Typography = StyleSheet.create({
  // Display Headings (for hero sections, large titles)
  display1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['9xl'],
    fontWeight: FontWeight.extraBold,
    lineHeight: FontSize['9xl'] * LineHeight.tight,
    color: Colors.text,
    letterSpacing: -2,
  },
  display2: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['8xl'],
    fontWeight: FontWeight.extraBold,
    lineHeight: FontSize['8xl'] * LineHeight.tight,
    color: Colors.text,
    letterSpacing: -1.5,
  },
  display3: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['7xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['7xl'] * LineHeight.tight,
    color: Colors.text,
    letterSpacing: -1,
  },
  
  // Heading Styles
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['6xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['6xl'] * LineHeight.tight,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['4xl'] * LineHeight.snug,
    color: Colors.text,
    letterSpacing: -0.25,
  },
  h3: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.semiBold,
    lineHeight: FontSize['3xl'] * LineHeight.snug,
    color: Colors.text,
  },
  h4: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.semiBold,
    lineHeight: FontSize['2xl'] * LineHeight.snug,
    color: Colors.text,
  },
  h5: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.xl * LineHeight.normal,
    color: Colors.text,
  },
  h6: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.lg * LineHeight.normal,
    color: Colors.text,
  },
  
  // Body Text Styles
  body1: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.relaxed,
    color: Colors.text,
  },
  body2: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.base * LineHeight.normal,
    color: Colors.textSecondary,
  },
  body3: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
    color: Colors.textSecondary,
  },
  
  // Specialized Text Styles
  lead: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.lg * LineHeight.relaxed,
    color: Colors.text,
  },
  subtitle1: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.md * LineHeight.normal,
    color: Colors.textSecondary,
  },
  subtitle2: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.base * LineHeight.normal,
    color: Colors.textSecondary,
  },
  
  // UI Element Styles
  button: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    lineHeight: FontSize.md * LineHeight.none,
    textAlign: 'center',
  },
  buttonSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    lineHeight: FontSize.base * LineHeight.none,
    textAlign: 'center',
  },
  buttonLarge: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semiBold,
    lineHeight: FontSize.lg * LineHeight.none,
    textAlign: 'center',
  },
  
  // Input Styles
  input: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.normal,
    color: Colors.text,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.base * LineHeight.normal,
    color: Colors.text,
  },
  placeholder: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.normal,
    color: Colors.placeholder,
  },
  
  // Small Text Styles
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
    color: Colors.textSecondary,
  },
  overline: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.xs * LineHeight.normal,
    color: Colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  
  // Navigation Styles
  tabLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.xs * LineHeight.normal,
    textAlign: 'center',
  },
  navTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semiBold,
    lineHeight: FontSize.lg * LineHeight.normal,
    color: Colors.text,
  },
  
  // Status and Badge Styles
  badge: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    lineHeight: FontSize.xs * LineHeight.none,
    textAlign: 'center',
  },
  tag: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.sm * LineHeight.none,
    textAlign: 'center',
  },
  
  // Special Text Styles
  code: {
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.base * LineHeight.normal,
    color: Colors.text,
  },
  link: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.normal,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  error: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
    color: Colors.error,
  },
  success: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
    color: Colors.success,
  },
  warning: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
    color: Colors.warning,
  },
});

// Text Transformation Utilities
export const TextTransform = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  none: 'none',
};

// Text Alignment Utilities
export const TextAlign = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
};

// Helper Functions
export const createTextStyle = ({
  fontSize = FontSize.md,
  fontWeight = FontWeight.regular,
  color = Colors.text,
  lineHeight,
  letterSpacing,
  textAlign = 'left',
  fontFamily = FontFamily.regular,
}) => ({
  fontFamily,
  fontSize,
  fontWeight,
  color,
  lineHeight: lineHeight || fontSize * LineHeight.normal,
  letterSpacing,
  textAlign,
});

export const getResponsiveFontSize = (baseSize, scaleFactor = 1.2) => {
  return Math.round(baseSize * scaleFactor);
};

export default {
  Typography,
  FontFamily,
  FontWeight,
  FontSize,
  LineHeight,
  TextTransform,
  TextAlign,
  createTextStyle,
  getResponsiveFontSize,
};''';

print("✅ Created Typography.js")
print(f"Length: {len(typography_js)} characters")
