import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import MainLayout from '../layouts/MainLayout';

// Mock data for search results
const mockUsers = [
  { id: '1', name: 'Ahmet Yılmaz', username: '@ahmet', bio: 'Yazılım Geliştirici' },
  { id: '2', name: 'Mehmet Kaya', username: '@mehmet', bio: 'Grafik Tasarımcı' },
  { id: '3', name: 'Ayşe Demir', username: '@ayse', bio: 'Dijital Pazarlama Uzmanı' },
  { id: '4', name: 'Fatma Şahin', username: '@fatma', bio: 'İçerik Üreticisi' },
  { id: '5', name: 'Ali Yıldız', username: '@ali', bio: 'Fotoğrafçı' },
  { id: '6', name: 'Zeynep Çelik', username: '@zeynep', bio: 'Mimar' },
  { id: '7', name: 'Mustafa Öztürk', username: '@mustafa', bio: 'Öğretmen' },
];

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(mockUsers);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setResults(mockUsers);
      return;
    }
    
    const filteredResults = mockUsers.filter(user => 
      user.name.toLowerCase().includes(text.toLowerCase()) || 
      user.username.toLowerCase().includes(text.toLowerCase()) ||
      user.bio.toLowerCase().includes(text.toLowerCase())
    );
    
    setResults(filteredResults);
  };

  const renderUserItem = ({ item }: { item: typeof mockUsers[0] }) => (
    <TouchableOpacity style={styles.userCard}>
      <View style={styles.profilePic} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userUsername}>{item.username}</Text>
        <Text style={styles.userBio}>{item.bio}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Kullanıcı, topluluk veya içerik ara..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        
        <FlatList
          data={results}
          renderItem={renderUserItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
            </View>
          }
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 15,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  userUsername: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  userBio: {
    fontSize: 14,
    color: '#888',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default SearchScreen; 