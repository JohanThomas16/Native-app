
product_detail_screen = '''import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Gradients} from '../styles/Colors';
import {Typography} from '../styles/Typography';
import {Spacing, BorderRadius} from '../styles/Spacing';

const ProductDetailScreen = ({navigation, route}) => {
  const {product} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const detailedFeatures = [
    ...product.features,
    'Advanced AI technology',
    'Regular updates',
    'Customer support',
    'API access',
  ];

  const reviews = [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      comment: 'Excellent tool, saves me hours of work every day!',
      date: '2 days ago',
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      comment: 'Great features but could use better mobile support.',
      date: '1 week ago',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={isFavorite ? Colors.error : Colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Product Hero */}
      <LinearGradient colors={Gradients.primary} style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color={Colors.accent} />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.ratingCount}>(1,234 reviews)</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Pricing */}
      <View style={styles.pricingSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.priceLabel}>per month</Text>
        </View>
        <TouchableOpacity style={styles.tryButton}>
          <Text style={styles.tryButtonText}>Start Free Trial</Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About this product</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.longDescription}>
          This powerful AI tool leverages cutting-edge technology to help you achieve your goals
          faster and more efficiently. With intuitive design and robust features, it's perfect
          for both beginners and advanced users.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        {detailedFeatures.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check-circle" size={20} color={Colors.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {reviews.map(review => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUser}>
                <Text style={styles.userName}>{review.user}</Text>
                <View style={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={14}
                      color={i < review.rating ? Colors.accent : Colors.lightGray}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.compareButton}
          onPress={() => navigation.navigate('Compare', {product})}>
          <Icon name="compare" size={20} color={Colors.primary} />
          <Text style={styles.compareButtonText}>Compare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.getStartedButton}>
          <LinearGradient colors={Gradients.primary} style={styles.gradientButton}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
  },
  hero: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  productName: {
    ...Typography.h1,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  productCategory: {
    ...Typography.body1,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.h4,
    color: Colors.white,
    marginLeft: Spacing.xs,
    marginRight: Spacing.sm,
  },
  ratingCount: {
    ...Typography.body2,
    color: Colors.white,
    opacity: 0.8,
  },
  pricingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    marginBottom: Spacing.sm,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  price: {
    ...Typography.h2,
    color: Colors.primary,
  },
  priceLabel: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  tryButton: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  tryButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  section: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  viewAll: {
    ...Typography.body1,
    color: Colors.primary,
    fontWeight: '600',
  },
  description: {
    ...Typography.body1,
    marginBottom: Spacing.md,
  },
  longDescription: {
    ...Typography.body1,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureText: {
    ...Typography.body1,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.md,
    marginBottom: Spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    ...Typography.body1,
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  reviewComment: {
    ...Typography.body1,
    color: Colors.textSecondary,
  },
  actionsSection: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    gap: Spacing.md,
  },
  compareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
  },
  compareButtonText: {
    ...Typography.button,
    color: Colors.primary,
    marginLeft: Spacing.sm,
  },
  getStartedButton: {
    flex: 2,
  },
  gradientButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  getStartedText: {
    ...Typography.button,
    color: Colors.white,
  },
});

export default ProductDetailScreen;''';

print("✅ Created ProductDetailScreen.js")
print(f"Length: {len(product_detail_screen)} characters")
