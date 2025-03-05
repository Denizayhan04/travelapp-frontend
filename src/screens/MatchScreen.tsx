import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MainLayout from '../layouts/MainLayout';

// Mock data for matches
const mockMatches = [
  { id: '1', name: 'Ahmet', age: 28, distance: '3 km' },
  { id: '2', name: 'Mehmet', age: 24, distance: '5 km' },
  { id: '3', name: 'Ayşe', age: 26, distance: '2 km' },
  { id: '4', name: 'Fatma', age: 25, distance: '7 km' },
  { id: '5', name: 'Ali', age: 30, distance: '1 km' },
];

const MatchScreen: React.FC = () => {
  const renderMatchItem = ({ item }: { item: typeof mockMatches[0] }) => (
    <View style={styles.matchCard}>
      <View style={styles.profilePic} />
      <View style={styles.matchInfo}>
        <Text style={styles.matchName}>{item.name}, {item.age}</Text>
        <Text style={styles.matchDistance}>{item.distance} uzaklıkta</Text>
      </View>
    </View>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <FlatList
          data={mockMatches}
          renderItem={renderMatchItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
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
  listContainer: {
    padding: 15,
  },
  matchCard: {
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    marginRight: 15,
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  matchDistance: {
    fontSize: 14,
    color: '#666',
  },
});

export default MatchScreen; 