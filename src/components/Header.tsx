import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderProps {
  variant: 'home' | 'match' | 'search' | 'communities' | 'profile';
  username?: string;
  onSearch?: (text: string) => void;
  onFilter?: () => void;
  onNotificationsPress?: () => void;
  onMessagesPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  variant,
  username,
  onSearch,
  onFilter,
  onNotificationsPress,
  onMessagesPress,
}) => {
  const renderContent = () => {
    switch (variant) {
      case 'home':
        return (
          <View style={styles.container}>
            <Text style={styles.appTitle}>TravelApp</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={onNotificationsPress}
              >
                <MaterialCommunityIcons name="bell-outline" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerButton, styles.lastHeaderButton]}
                onPress={onMessagesPress}
              >
                <MaterialCommunityIcons name="message-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'match':
        return (
          <View style={[styles.container, styles.searchContainer]}>
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons name="magnify" size={24} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Seyahat arkadaşı ara..."
                placeholderTextColor="#666"
                onChangeText={onSearch}
              />
            </View>
            <TouchableOpacity onPress={onFilter} style={styles.filterButton}>
              <MaterialCommunityIcons name="filter-variant" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        );

      case 'search':
        return (
          <View style={[styles.container, styles.searchContainer]}>
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons name="magnify" size={24} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Ara..."
                placeholderTextColor="#666"
                onChangeText={onSearch}
              />
            </View>
          </View>
        );

      case 'communities':
        return (
          <View style={[styles.container, styles.searchContainer]}>
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons name="magnify" size={24} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Topluluk ara..."
                placeholderTextColor="#666"
                onChangeText={onSearch}
              />
            </View>
          </View>
        );

      case 'profile':
        return (
          <View style={styles.container}>
            <Text style={styles.username}>{username}</Text>
          </View>
        );

      default:
        return null;
    }
  };

  return <View style={styles.headerWrapper}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  searchContainer: {
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  lastHeaderButton: {
    marginRight: -8,
  },
});

export default Header; 