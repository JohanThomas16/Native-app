
profile_screen = '''import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Gradients} from '../styles/Colors';
import {Typography} from '../styles/Typography';
import {Spacing, BorderRadius} from '../styles/Spacing';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    preferences: {
      notifications: true,
      darkMode: false,
      emailUpdates: true,
    },
  });

  const [favorites, setFavorites] = useState([
    {id: 1, name: 'ChatGPT Plus', category: 'AI Assistants'},
    {id: 2, name: 'Midjourney', category: 'AI Art'},
  ]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async (newData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(newData));
      setUserData(newData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const togglePreference = (key) => {
    const newData = {
      ...userData,
      preferences: {
        ...userData.preferences,
        [key]: !userData.preferences[key],
      },
    };
    saveUserData(newData);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            Alert.alert('Logged out', 'You have been logged out successfully');
          },
        },
      ]
    );
  };

  const clearData = () => {
    Alert.alert(
      'Clear Data',
      'This will remove all your saved preferences and favorites. Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setUserData({
                name: 'John Doe',
                email: 'john.doe@example.com',
                preferences: {
                  notifications: true,
                  darkMode: false,
                  emailUpdates: true,
                },
              });
              setFavorites([]);
              Alert.alert('Success', 'Data cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      title: 'Account Settings',
      icon: 'person',
      onPress: () => Alert.alert('Coming Soon', 'Account settings will be available soon'),
    },
    {
      title: 'Help & Support',
      icon: 'help',
      onPress: () => Alert.alert('Help', 'Contact us at support@aiproductadvisor.com'),
    },
    {
      title: 'About',
      icon: 'info',
      onPress: () => Alert.alert('About', 'AI Product Advisor v1.0.0'),
    },
    {
      title: 'Privacy Policy',
      icon: 'privacy-tip',
      onPress: () => Alert.alert('Privacy', 'Privacy policy will be displayed here'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient colors={Gradients.primary} style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userData.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Comparisons</Text>
        </View>
      </View>

      {/* Favorites */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Favorites</Text>
        {favorites.length > 0 ? (
          favorites.map(item => (
            <View key={item.id} style={styles.favoriteItem}>
              <View style={styles.favoriteInfo}>
                <Text style={styles.favoriteName}>{item.name}</Text>
                <Text style={styles.favoriteCategory}>{item.category}</Text>
              </View>
              <Icon name="favorite" size={20} color={Colors.error} />
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No favorites yet</Text>
        )}
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Notifications</Text>
            <Text style={styles.preferenceSubtitle}>Get notified about new products</Text>
          </View>
          <Switch
            value={userData.preferences.notifications}
            onValueChange={() => togglePreference('notifications')}
            trackColor={{false: Colors.lightGray, true: Colors.primary}}
            thumbColor={Colors.white}
          />
        </View>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Dark Mode</Text>
            <Text style={styles.preferenceSubtitle}>Use dark theme</Text>
          </View>
          <Switch
            value={userData.preferences.darkMode}
            onValueChange={() => togglePreference('darkMode')}
            trackColor={{false: Colors.lightGray, true: Colors.primary}}
            thumbColor={Colors.white}
          />
        </View>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceTitle}>Email Updates</Text>
            <Text style={styles.preferenceSubtitle}>Receive weekly product updates</Text>
          </View>
          <Switch
            value={userData.preferences.emailUpdates}
            onValueChange={() => togglePreference('emailUpdates')}
            trackColor={{false: Colors.lightGray, true: Colors.primary}}
            thumbColor={Colors.white}
          />
        </View>
      </View>

      {/* Menu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}>
            <View style={styles.menuItemLeft}>
              <Icon name={item.icon} size={24} color={Colors.textSecondary} />
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={Colors.gray} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        
        <TouchableOpacity style={styles.dangerItem} onPress={clearData}>
          <Icon name="delete" size={24} color={Colors.error} />
          <Text style={styles.dangerText}>Clear All Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerItem} onPress={handleLogout}>
          <Icon name="logout" size={24} color={Colors.error} />
          <Text style={styles.dangerText}>Logout</Text>
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
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: '700',
  },
  userName: {
    ...Typography.h3,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    ...Typography.body1,
    color: Colors.white,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  section: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Spacing.md,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    ...Typography.body1,
    fontWeight: '600',
  },
  favoriteCategory: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  emptyText: {
    ...Typography.body1,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceTitle: {
    ...Typography.body1,
    fontWeight: '600',
  },
  preferenceSubtitle: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    ...Typography.body1,
    marginLeft: Spacing.md,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dangerText: {
    ...Typography.body1,
    color: Colors.error,
    marginLeft: Spacing.md,
  },
});

export default ProfileScreen;''';

print("✅ Created ProfileScreen.js")
print(f"Length: {len(profile_screen)} characters")

# Create a comprehensive CSV with all screen files
screen_files_data = [
    ["src/screens/HomeScreen.js", home_screen, "Home screen with featured products, categories, search, and quick actions"],
    ["src/screens/ProductsScreen.js", products_screen, "Product catalog with search, filtering, and category navigation"],
    ["src/screens/AIAdvisorScreen.js", ai_advisor_screen, "AI chat interface with contextual recommendations and suggestions"],
    ["src/screens/ProductDetailScreen.js", product_detail_screen, "Detailed product view with reviews, features, and actions"],
    ["src/screens/CompareScreen.js", compare_screen, "Side-by-side product comparison with feature matrix"],
    ["src/screens/ProfileScreen.js", profile_screen, "User profile with preferences, favorites, and account management"],
]

import csv
with open('all_screen_files.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['File Path', 'Complete Code', 'Description'])
    
    for file_data in screen_files_data:
        writer.writerow(file_data)

print(f"\n📱 All 6 Screen Files Complete!")
print("📁 Files saved to: all_screen_files.csv")
print("\n🎯 Summary:")
for i, file_data in enumerate(screen_files_data, 1):
    filename = file_data[0].split('/')[-1]
    description = file_data[2]
    char_count = len(file_data[1])
    print(f"{i}. {filename} ({char_count:,} chars) - {description}")
