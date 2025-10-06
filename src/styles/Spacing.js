
spacing_js = '''// Spacing System - Based on 4px grid system
export const Spacing = {
  // Base spacing units (4px increments)
  xs: 4,      // Extra small
  sm: 8,      // Small
  md: 16,     // Medium
  lg: 24,     // Large
  xl: 32,     // Extra large
  xxl: 48,    // 2X large
  '3xl': 64,  // 3X large
  '4xl': 80,  // 4X large
  '5xl': 96,  // 5X large
  '6xl': 128, // 6X large
  
  // Micro spacing (for fine adjustments)
  px: 1,      // 1 pixel
  '0.5': 2,   // 0.5 unit
  '1.5': 6,   // 1.5 units
  '2.5': 10,  // 2.5 units
  
  // Component-specific spacing
  none: 0,
  auto: 'auto',
};

// Padding Variants
export const Padding = {
  // Uniform padding
  xs: Spacing.xs,
  sm: Spacing.sm,
  md: Spacing.md,
  lg: Spacing.lg,
  xl: Spacing.xl,
  xxl: Spacing.xxl,
  
  // Horizontal padding
  horizontal: {
    xs: {paddingHorizontal: Spacing.xs},
    sm: {paddingHorizontal: Spacing.sm},
    md: {paddingHorizontal: Spacing.md},
    lg: {paddingHorizontal: Spacing.lg},
    xl: {paddingHorizontal: Spacing.xl},
    xxl: {paddingHorizontal: Spacing.xxl},
  },
  
  // Vertical padding
  vertical: {
    xs: {paddingVertical: Spacing.xs},
    sm: {paddingVertical: Spacing.sm},
    md: {paddingVertical: Spacing.md},
    lg: {paddingVertical: Spacing.lg},
    xl: {paddingVertical: Spacing.xl},
    xxl: {paddingVertical: Spacing.xxl},
  },
  
  // Individual sides
  top: {
    xs: {paddingTop: Spacing.xs},
    sm: {paddingTop: Spacing.sm},
    md: {paddingTop: Spacing.md},
    lg: {paddingTop: Spacing.lg},
    xl: {paddingTop: Spacing.xl},
    xxl: {paddingTop: Spacing.xxl},
  },
  
  bottom: {
    xs: {paddingBottom: Spacing.xs},
    sm: {paddingBottom: Spacing.sm},
    md: {paddingBottom: Spacing.md},
    lg: {paddingBottom: Spacing.lg},
    xl: {paddingBottom: Spacing.xl},
    xxl: {paddingBottom: Spacing.xxl},
  },
  
  left: {
    xs: {paddingLeft: Spacing.xs},
    sm: {paddingLeft: Spacing.sm},
    md: {paddingLeft: Spacing.md},
    lg: {paddingLeft: Spacing.lg},
    xl: {paddingLeft: Spacing.xl},
    xxl: {paddingLeft: Spacing.xxl},
  },
  
  right: {
    xs: {paddingRight: Spacing.xs},
    sm: {paddingRight: Spacing.sm},
    md: {paddingRight: Spacing.md},
    lg: {paddingRight: Spacing.lg},
    xl: {paddingRight: Spacing.xl},
    xxl: {paddingRight: Spacing.xxl},
  },
};

// Margin Variants
export const Margin = {
  // Uniform margin
  xs: Spacing.xs,
  sm: Spacing.sm,
  md: Spacing.md,
  lg: Spacing.lg,
  xl: Spacing.xl,
  xxl: Spacing.xxl,
  
  // Horizontal margin
  horizontal: {
    xs: {marginHorizontal: Spacing.xs},
    sm: {marginHorizontal: Spacing.sm},
    md: {marginHorizontal: Spacing.md},
    lg: {marginHorizontal: Spacing.lg},
    xl: {marginHorizontal: Spacing.xl},
    xxl: {marginHorizontal: Spacing.xxl},
  },
  
  // Vertical margin
  vertical: {
    xs: {marginVertical: Spacing.xs},
    sm: {marginVertical: Spacing.sm},
    md: {marginVertical: Spacing.md},
    lg: {marginVertical: Spacing.lg},
    xl: {marginVertical: Spacing.xl},
    xxl: {marginVertical: Spacing.xxl},
  },
  
  // Individual sides
  top: {
    xs: {marginTop: Spacing.xs},
    sm: {marginTop: Spacing.sm},
    md: {marginTop: Spacing.md},
    lg: {marginTop: Spacing.lg},
    xl: {marginTop: Spacing.xl},
    xxl: {marginTop: Spacing.xxl},
  },
  
  bottom: {
    xs: {marginBottom: Spacing.xs},
    sm: {marginBottom: Spacing.sm},
    md: {marginBottom: Spacing.md},
    lg: {marginBottom: Spacing.lg},
    xl: {marginBottom: Spacing.xl},
    xxl: {marginBottom: Spacing.xxl},
  },
  
  left: {
    xs: {marginLeft: Spacing.xs},
    sm: {marginLeft: Spacing.sm},
    md: {marginLeft: Spacing.md},
    lg: {marginLeft: Spacing.lg},
    xl: {marginLeft: Spacing.xl},
    xxl: {marginLeft: Spacing.xxl},
  },
  
  right: {
    xs: {marginRight: Spacing.xs},
    sm: {marginRight: Spacing.sm},
    md: {marginRight: Spacing.md},
    lg: {marginRight: Spacing.lg},
    xl: {marginRight: Spacing.xl},
    xxl: {marginRight: Spacing.xxl},
  },
};

// Border Radius System
export const BorderRadius = {
  // Basic radius values
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  '3xl': 32,
  full: 999, // Pill shape
  
  // Component-specific radius
  button: 8,
  card: 12,
  input: 8,
  modal: 16,
  avatar: 999,
  badge: 12,
  
  // Corner-specific radius
  topLeft: {
    xs: {borderTopLeftRadius: 2},
    sm: {borderTopLeftRadius: 4},
    md: {borderTopLeftRadius: 8},
    lg: {borderTopLeftRadius: 12},
    xl: {borderTopLeftRadius: 16},
  },
  
  topRight: {
    xs: {borderTopRightRadius: 2},
    sm: {borderTopRightRadius: 4},
    md: {borderTopRightRadius: 8},
    lg: {borderTopRightRadius: 12},
    xl: {borderTopRightRadius: 16},
  },
  
  bottomLeft: {
    xs: {borderBottomLeftRadius: 2},
    sm: {borderBottomLeftRadius: 4},
    md: {borderBottomLeftRadius: 8},
    lg: {borderBottomLeftRadius: 12},
    xl: {borderBottomLeftRadius: 16},
  },
  
  bottomRight: {
    xs: {borderBottomRightRadius: 2},
    sm: {borderBottomRightRadius: 4},
    md: {borderBottomRightRadius: 8},
    lg: {borderBottomRightRadius: 12},
    xl: {borderBottomRightRadius: 16},
  },
  
  // Side-specific radius
  top: {
    xs: {borderTopLeftRadius: 2, borderTopRightRadius: 2},
    sm: {borderTopLeftRadius: 4, borderTopRightRadius: 4},
    md: {borderTopLeftRadius: 8, borderTopRightRadius: 8},
    lg: {borderTopLeftRadius: 12, borderTopRightRadius: 12},
    xl: {borderTopLeftRadius: 16, borderTopRightRadius: 16},
  },
  
  bottom: {
    xs: {borderBottomLeftRadius: 2, borderBottomRightRadius: 2},
    sm: {borderBottomLeftRadius: 4, borderBottomRightRadius: 4},
    md: {borderBottomLeftRadius: 8, borderBottomRightRadius: 8},
    lg: {borderBottomLeftRadius: 12, borderBottomRightRadius: 12},
    xl: {borderBottomLeftRadius: 16, borderBottomRightRadius: 16},
  },
  
  left: {
    xs: {borderTopLeftRadius: 2, borderBottomLeftRadius: 2},
    sm: {borderTopLeftRadius: 4, borderBottomLeftRadius: 4},
    md: {borderTopLeftRadius: 8, borderBottomLeftRadius: 8},
    lg: {borderTopLeftRadius: 12, borderBottomLeftRadius: 12},
    xl: {borderTopLeftRadius: 16, borderBottomLeftRadius: 16},
  },
  
  right: {
    xs: {borderTopRightRadius: 2, borderBottomRightRadius: 2},
    sm: {borderTopRightRadius: 4, borderBottomRightRadius: 4},
    md: {borderTopRightRadius: 8, borderBottomRightRadius: 8},
    lg: {borderTopRightRadius: 12, borderBottomRightRadius: 12},
    xl: {borderTopRightRadius: 16, borderBottomRightRadius: 16},
  },
};

// Layout Dimensions
export const Layout = {
  // Screen dimensions (will be set by Dimensions API)
  screen: {
    width: 0,
    height: 0,
  },
  
  // Component dimensions
  header: 56,
  tabBar: 60,
  button: 44,
  input: 48,
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    xxl: 80,
  },
  
  // Container widths
  container: {
    sm: 320,
    md: 768,
    lg: 1024,
    xl: 1200,
  },
  
  // Icon sizes
  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
};

// Hit Slop for touchable elements
export const HitSlop = {
  xs: {top: 4, bottom: 4, left: 4, right: 4},
  sm: {top: 8, bottom: 8, left: 8, right: 8},
  md: {top: 12, bottom: 12, left: 12, right: 12},
  lg: {top: 16, bottom: 16, left: 16, right: 16},
  xl: {top: 20, bottom: 20, left: 20, right: 20},
};

// Z-Index Stack
export const ZIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  overlay: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
  max: 9999,
};

// Helper Functions
export const createSpacing = (multiplier = 1) => Spacing.md * multiplier;

export const createPadding = (vertical = Spacing.md, horizontal = Spacing.md) => ({
  paddingVertical: vertical,
  paddingHorizontal: horizontal,
});

export const createMargin = (vertical = Spacing.md, horizontal = Spacing.md) => ({
  marginVertical: vertical,
  marginHorizontal: horizontal,
});

export const createBorderRadius = (radius = BorderRadius.md) => ({
  borderRadius: radius,
});

// Responsive spacing based on screen size
export const getResponsiveSpacing = (baseSpacing, screenWidth) => {
  if (screenWidth < 375) return baseSpacing * 0.8;
  if (screenWidth > 768) return baseSpacing * 1.2;
  return baseSpacing;
};

// Gap utility for flexbox layouts (React Native 0.71+)
export const Gap = {
  xs: Spacing.xs,
  sm: Spacing.sm,
  md: Spacing.md,
  lg: Spacing.lg,
  xl: Spacing.xl,
  xxl: Spacing.xxl,
};

export default {
  Spacing,
  Padding,
  Margin,
  BorderRadius,
  Layout,
  HitSlop,
  ZIndex,
  Gap,
  createSpacing,
  createPadding,
  createMargin,
  createBorderRadius,
  getResponsiveSpacing,
};''';

print("✅ Created Spacing.js")
print(f"Length: {len(spacing_js)} characters")
