import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MainLayout from '../layouts/MainLayout';

// Mock data for communities
const mockCommunities = [
  { id: '1', name: 'Teknoloji Meraklıları', members: 1250, posts: 324 },
  { id: '2', name: 'Seyahat Tutkunları', members: 875, posts: 210 },
  { id: '3', name: 'Kitap Kulübü', members: 620, posts: 150 },
  { id: '4', name: 'Fitness & Sağlık', members: 1540, posts: 430 },
  { id: '5', name: 'Yemek Tarifleri', members: 980, posts: 275 },
  { id: '6', name: 'Fotoğrafçılık', members: 750, posts: 190 },
  { id: '7', name: 'Müzik Severler', members: 1100, posts: 310 },
];

const CommunitiesScreen: React.FC = () => {
  const renderCommunityItem = ({ item }: { item: typeof mockCommunities[0] }) => (
    <TouchableOpacity style={styles.communityCard}>
      <View style={styles.communityIcon} />
      <View style={styles.communityInfo}>
        <Text style={styles.communityName}>{item.name}</Text>
        <Text style={styles.communityStats}>
          {item.members} üye • {item.posts} gönderi
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.categoriesContainer}>
          <ScrollableCategories />
        </View>
        
        <FlatList
          data={mockCommunities}
          renderItem={renderCommunityItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </MainLayout>
  );
};

// Horizontal scrollable categories component
const ScrollableCategories = () => {
  const categories = [
    'Tümü', 'Teknoloji', 'Seyahat', 'Kitaplar', 'Fitness', 
    'Yemek', 'Fotoğrafçılık', 'Müzik', 'Sanat', 'Oyunlar'
  ];
  
  return (
    <FlatList
      horizontal
      data={categories}
      renderItem={({ item, index }) => (
        <TouchableOpacity 
          style={[
            styles.categoryButton, 
            index === 0 ? styles.activeCategoryButton : null
          ]}
        >
          <Text 
            style={[
              styles.categoryText, 
              index === 0 ? styles.activeCategoryText : null
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeCategoryButton: {
    backgroundColor: '#4A80F0',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  communityCard: {
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
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginRight: 15,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  communityStats: {
    fontSize: 14,
    color: '#666',
  },
});

export default CommunitiesScreen; 