products_screen = '''import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../styles/Colors';
import {Typography} from '../styles/Typography';
import {Spacing, BorderRadius} from '../styles/Spacing';

const ProductsScreen = ({navigation, route}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI Assistants', 'AI Art', 'Productivity', 'Development'];

  useEffect(() => {
    // Simulate loading products
    const mockProducts = [
      {
        id: 1,
        name: 'ChatGPT Plus',
        category: 'AI Assistants',
        rating: 4.8,
        price: '$20/month',
        description: 'Advanced conversational AI with GPT-4',
        features: ['Advanced reasoning', 'Code generation', 'Creative writing'],
      },
      {
        id: 2,
        name: 'Midjourney',
        category: 'AI Art',
        rating: 4.7,
        price: '$10/month',
        description: 'AI-powered image generation',
        features: ['High-quality images', 'Multiple styles', 'Commercial use'],
      },
      {
        id: 3,
        name: 'Notion AI',
        category: 'Productivity',
        rating: 4.6,
        price: '$8/month',
        description: 'AI writing assistant for Notion',
        features: ['Content generation', 'Summarization', 'Translation'],
      },
      {
        id: 4,
        name: 'GitHub Copilot',
        category: 'Development',
        rating: 4.5,
        price: '$10/month',
        description: 'AI pair programmer',
        features: ['Code completion', 'Multiple languages', 'Context-aware'],
      },
      {
        id: 5,
        name: 'Jasper AI',
        category: 'Productivity',
        rating: 4.4,
        price: '$29/month',
        description: 'AI copywriting tool',
        features: ['Marketing copy', 'SEO optimization', 'Brand voice'],
      },
      {
        id: 6,
        name: 'DALL-E 2',
        category: 'AI Art',
        rating: 4.3,
        price: '$15/month',
        description: 'OpenAI image generation',
        features: ['Realistic images', 'Inpainting', 'Variations'],
      },
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);

    // Set category from navigation params
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route.params]);

  useEffect(() => {
    // Filter products based on search and category
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', {product: item})}>
      <View style={styles.productHeader}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
        </View>
        <View style={styles.productMeta}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color={Colors.accent} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.featuresContainer}>
        {item.features.slice(0, 2).map((feature, index) => (
          <View key={index} style={styles.featureTag}>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
        {item.features.length > 2 && (
          <Text style={styles.moreFeatures}>+{item.features.length - 2} more</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        selectedCategory === item && styles.categoryTabActive,
      ]}
      onPress={() => setSelectedCategory(item)}>
      <Text
        style={[
          styles.categoryTabText,
          selectedCategory === item && styles.categoryTabTextActive,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Compare')}>
          <Icon name="compare" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={Colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  title: {
    ...Typography.h2,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    ...Typography.body1,
  },
  categoriesSection: {
    backgroundColor: Colors.white,
    paddingBottom: Spacing.md,
  },
  categoriesList: {
    paddingHorizontal: Spacing.lg,
  },
  categoryTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    backgroundColor: Colors.background,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
  },
  categoryTabText: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  productsList: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
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
    color: Colors.primary,
  },
  productMeta: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
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
  productDescription: {
    ...Typography.body1,
    marginBottom: Spacing.md,
    color: Colors.textSecondary,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  featureTag: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
    marginRight: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  featureText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  moreFeatures: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '500',
  },
});

export default ProductsScreen;''';

print("✅ Created ProductsScreen.js")
print(f"Length: {len(products_screen)} characters")
