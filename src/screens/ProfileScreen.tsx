import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const ProfileScreen: React.FC = () => {
  // Mock user data
  const user = {
    name: 'Ahmet Yılmaz',
    username: '@ahmet',
    bio: 'Yazılım Geliştirici | React Native & TypeScript | İstanbul',
    followers: 245,
    following: 187,
    posts: 42,
  };

  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.profilePic} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileUsername}>{user.username}</Text>
          <Text style={styles.profileBio}>{user.bio}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.posts}</Text>
              <Text style={styles.statLabel}>Gönderi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Takipçi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Takip</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gönderiler</Text>
          <View style={styles.postsGrid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} style={styles.postItem} />
            ))}
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Topluluklar</Text>
          <View style={styles.communitiesList}>
            {['Teknoloji Meraklıları', 'Seyahat Tutkunları', 'Kitap Kulübü'].map((item) => (
              <TouchableOpacity key={item} style={styles.communityItem}>
                <View style={styles.communityIcon} />
                <Text style={styles.communityName}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileHeader: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileUsername: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postItem: {
    width: '32%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
    marginBottom: 10,
    borderRadius: 5,
  },
  communitiesList: {
    marginTop: 10,
  },
  communityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  communityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 15,
  },
  communityName: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen; 