
compare_screen = '''import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../styles/Colors';
import {Typography} from '../styles/Typography';
import {Spacing, BorderRadius} from '../styles/Spacing';

const CompareScreen = ({navigation, route}) => {
  const [selectedProducts, setSelectedProducts] = useState(
    route.params?.product ? [route.params.product] : []
  );
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = [
    {
      id: 1,
      name: 'ChatGPT Plus',
      category: 'AI Assistants',
      rating: 4.8,
      price: '$20/month',
      features: {
        'AI Model': 'GPT-4',
        'Response Speed': 'Fast',
        'API Access': 'Yes',
        'Custom Instructions': 'Yes',
        'File Upload': 'Yes',
      },
    },
    {
      id: 2,
      name: 'Claude Pro',
      category: 'AI Assistants',
      rating: 4.7,
      price: '$20/month',
      features: {
        'AI Model': 'Claude-3',
        'Response Speed': 'Fast',
        'API Access': 'Yes',
        'Custom Instructions': 'Limited',
        'File Upload': 'Yes',
      },
    },
    {
      id: 3,
      name: 'Midjourney',
      category: 'AI Art',
      rating: 4.7,
      price: '$10/month',
      features: {
        'Image Quality': 'Excellent',
        'Style Variety': 'High',
        'Commercial Use': 'Yes',
        'API Access': 'No',
        'Batch Processing': 'Limited',
      },
    },
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedProducts.find(selected => selected.id === product.id)
  );

  const addProduct = (product) => {
    if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const getComparisonFeatures = () => {
    if (selectedProducts.length === 0) return [];
    
    const allFeatures = new Set();
    selectedProducts.forEach(product => {
      Object.keys(product.features).forEach(feature => allFeatures.add(feature));
    });
    
    return Array.from(allFeatures);
  };

  const renderProductSelector = ({item}) => (
    <TouchableOpacity
      style={styles.productSelectorCard}
      onPress={() => addProduct(item)}>
      <View style={styles.productSelectorInfo}>
        <Text style={styles.productSelectorName}>{item.name}</Text>
        <Text style={styles.productSelectorCategory}>{item.category}</Text>
        <Text style={styles.productSelectorPrice}>{item.price}</Text>
      </View>
      <Icon name="add" size={24} color={Colors.primary} />
    </TouchableOpacity>
  );

  const renderComparisonTable = () => {
    if (selectedProducts.length === 0) return null;

    const features = getComparisonFeatures();

    return (
      <View style={styles.comparisonTable}>
        {/* Header Row */}
        <View style={styles.tableRow}>
          <View style={styles.featureColumn}>
            <Text style={styles.tableHeader}>Features</Text>
          </View>
          {selectedProducts.map(product => (
            <View key={product.id} style={styles.productColumn}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeProduct(product.id)}>
                <Icon name="close" size={16} color={Colors.error} />
              </TouchableOpacity>
              <Text style={styles.productHeader}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          ))}
        </View>

        {/* Basic Info Rows */}
        <View style={styles.tableRow}>
          <View style={styles.featureColumn}>
            <Text style={styles.featureLabel}>Rating</Text>
          </View>
          {selectedProducts.map(product => (
            <View key={product.id} style={styles.productColumn}>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color={Colors.accent} />
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tableRow}>
          <View style={styles.featureColumn}>
            <Text style={styles.featureLabel}>Category</Text>
          </View>
          {selectedProducts.map(product => (
            <View key={product.id} style={styles.productColumn}>
              <Text style={styles.featureValue}>{product.category}</Text>
            </View>
          ))}
        </View>

        {/* Feature Rows */}
        {features.map(feature => (
          <View key={feature} style={styles.tableRow}>
            <View style={styles.featureColumn}>
              <Text style={styles.featureLabel}>{feature}</Text>
            </View>
            {selectedProducts.map(product => (
              <View key={product.id} style={styles.productColumn}>
                <Text style={styles.featureValue}>
                  {product.features[feature] || 'N/A'}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Compare Products</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search and Add Products */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>
            Add products to compare ({selectedProducts.length}/3)
          </Text>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color={Colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products to add..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.gray}
            />
          </View>
          
          {filteredProducts.length > 0 && selectedProducts.length < 3 && (
            <FlatList
              data={filteredProducts}
              renderItem={renderProductSelector}
              keyExtractor={item => item.id.toString()}
              style={styles.productSelectorList}
            />
          )}
        </View>

        {/* Comparison Table */}
        {selectedProducts.length > 0 && (
          <View style={styles.comparisonSection}>
            <Text style={styles.sectionTitle}>Comparison</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {renderComparisonTable()}
            </ScrollView>
          </View>
        )}

        {/* Empty State */}
        {selectedProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="compare" size={64} color={Colors.lightGray} />
            <Text style={styles.emptyTitle}>No products selected</Text>
            <Text style={styles.emptySubtitle}>
              Search and add products above to start comparing
            </Text>
          </View>
        )}
      </ScrollView>
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
    ...Typography.h3,
  },
  searchSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    ...Typography.body1,
  },
  productSelectorList: {
    maxHeight: 200,
  },
  productSelectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  productSelectorInfo: {
    flex: 1,
  },
  productSelectorName: {
    ...Typography.body1,
    fontWeight: '600',
  },
  productSelectorCategory: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  productSelectorPrice: {
    ...Typography.body2,
    color: Colors.primary,
    fontWeight: '600',
  },
  comparisonSection: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.lg,
  },
  comparisonTable: {
    marginHorizontal: Spacing.lg,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    minHeight: 60,
  },
  featureColumn: {
    width: 120,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.background,
  },
  productColumn: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 4,
  },
  tableHeader: {
    ...Typography.body1,
    fontWeight: '700',
  },
  productHeader: {
    ...Typography.body2,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  productPrice: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  featureLabel: {
    ...Typography.body2,
    fontWeight: '600',
  },
  featureValue: {
    ...Typography.body2,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.body2,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  emptyTitle: {
    ...Typography.h4,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    ...Typography.body1,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default CompareScreen;''';

print("✅ Created CompareScreen.js")
print(f"Length: {len(compare_screen)} characters")
