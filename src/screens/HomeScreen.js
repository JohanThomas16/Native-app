home_screen = '''import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Gradients} from '../styles/Colors';
import {Typography} from '../styles/Typography';
import {Spacing, BorderRadius} from '../styles/Spacing';

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Simulate loading featured products
    setFeaturedProducts([
      {id: 1, name: 'ChatGPT Plus', category: 'AI Assistant', rating: 4.8, price: '$20/month'},
      {id: 2, name: 'Midjourney', category: 'AI Art', rating: 4.7, price: '$10/month'},
      {id: 3, name: 'Notion AI', category: 'Productivity', rating: 4.6, price: '$8/month'},
    ]);
  }, []);

  const categories = [
    {name: 'AI Assistants', icon: 'psychology', color: Colors.primary},
    {name: 'AI Art', icon: 'palette', color: Colors.secondary},
    {name: 'Productivity', icon: 'work', color: Colors.accent},
    {name: 'Development', icon: 'code', color: Colors.success},
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={Gradients.primary} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.title}>Find the Perfect AI Tool</Text>
          <Text style={styles.subtitle}>
            Get personalized recommendations powered by AI
          </Text>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={Colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search AI products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryCard, {backgroundColor: category.color}]}
                onPress={() => navigation.navigate('Products', {category: category.name})}>
                <Icon name={category.icon} size={24} color={Colors.white} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {featuredProducts.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('Products', {
              screen: 'ProductDetail',
              params: {product}
            })}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              <View style={styles.productMeta}>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color={Colors.accent} />
                  <Text style={styles.rating}>{product.rating}</Text>
                </View>
                <Text style={styles.price}>{product.price}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={Colors.gray} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('AI Advisor')}>
            <LinearGradient colors={Gradients.secondary} style={styles.actionGradient}>
              <Icon name="psychology" size={24} color={Colors.white} />
              <Text style={styles.actionText}>Get AI Advice</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Products', {screen: 'Compare'})}>
            <LinearGradient colors={Gradients.success} style={styles.actionGradient}>
              <Icon name="compare" size={24} color={Colors.white} />
              <Text style={styles.actionText}>Compare Tools</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: Spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    ...Typography.h4,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h2,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: -20,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    ...Typography.body1,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
  },
  viewAll: {
    ...Typography.body1,
    color: Colors.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingRight: Spacing.lg,
  },
  categoryCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 80,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  categoryText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  productCategory: {
    ...Typography.body2,
    marginBottom: Spacing.sm,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.body2,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  price: {
    ...Typography.body1,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  actionGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  actionText: {
    ...Typography.body1,
    color: Colors.white,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
});

export default HomeScreen;''';

print("✅ Created HomeScreen.js")
print(f"Length: {len(home_screen)} characters")
