import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainLayout from '../layouts/MainLayout';

// Örnek veri - gerçek uygulamada API'den gelecek
const MOCK_USERS = [
  { id: '1', username: 'ahmetyilmaz', name: 'Ahmet Yılmaz' },
  { id: '2', username: 'mehmetkaya', name: 'Mehmet Kaya' },
  { id: '3', username: 'aysedemir', name: 'Ayşe Demir' },
  { id: '4', username: 'fatmaozturk', name: 'Fatma Öztürk' },
  { id: '5', username: 'aliyildiz', name: 'Ali Yıldız' },
];

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<typeof MOCK_USERS>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Arama sonuçlarını filtrele
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = MOCK_USERS.filter(
        user =>
          user.username.toLowerCase().includes(query) ||
          user.name.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Aramayı geçmişe ekle
  const handleSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 9)]); // Son 10 aramayı tut
    }
    Keyboard.dismiss();
  };

  // Tek bir aramayı geçmişten sil
  const removeSearch = (searchToRemove: string) => {
    setRecentSearches(prev => prev.filter(search => search !== searchToRemove));
  };

  // Tüm arama geçmişini temizle
  const clearAllSearches = () => {
    setRecentSearches([]);
  };

  const renderSearchItem = ({ item }: { item: typeof MOCK_USERS[0] }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearch = ({ item }: { item: string }) => (
    <View style={styles.recentItem}>
      <TouchableOpacity
        style={styles.recentSearchText}
        onPress={() => setSearchQuery(item)}
      >
        <MaterialCommunityIcons name="history" size={20} color="#666" />
        <Text style={styles.recentSearchQuery}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeSearch(item)}
      >
        <MaterialCommunityIcons name="close" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <MainLayout
      onSearch={(text) => {
        setSearchQuery(text);
        if (!text.trim()) {
          handleSearch(text);
        }
      }}
    >
      <View style={styles.container}>
        {/* Son Aramalar veya Arama Sonuçları */}
        {!isSearching ? (
          recentSearches.length > 0 ? (
            <View style={styles.recentSearches}>
              <View style={styles.recentHeader}>
                <Text style={styles.recentTitle}>Son Aramalar</Text>
                <TouchableOpacity onPress={clearAllSearches}>
                  <Text style={styles.clearAll}>Tümünü Temizle</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={recentSearches}
                renderItem={renderRecentSearch}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Henüz arama yapılmadı</Text>
            </View>
          )
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderSearchItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
              </View>
            }
          />
        )}
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  recentSearches: {
    flex: 1,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearAll: {
    color: '#4A80F0',
    fontSize: 14,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  recentSearchText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentSearchQuery: {
    marginLeft: 12,
    fontSize: 15,
  },
  removeButton: {
    padding: 4,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  userInfo: {
    marginLeft: 12,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
  },
});

export default SearchScreen; 