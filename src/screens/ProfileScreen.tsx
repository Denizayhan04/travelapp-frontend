import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';

// Örnek veri
const mockProfile = {
  name: 'Ahmet Yılmaz',
  username: '@ahmetyilmaz',
  profileImage: 'https://picsum.photos/200',
  coverImage: 'https://picsum.photos/800/400',
  bio: 'Gezmeyi ve yeni yerler keşfetmeyi seven bir gezgin. Fotoğraf çekmeye bayılırım ve her anı ölümsüzleştirmeye çalışırım. ✈️ 📸',
  followers: 1234,
  following: 891,
  hobbies: ['Fotoğrafçılık', 'Seyahat', 'Yüzme', 'Kitap Okuma'],
  languages: ['Türkçe', 'İngilizce', 'İspanyolca'],
  joinedCommunities: [
    {
      id: '1',
      name: 'Gezginler Kulübü',
      image: 'https://picsum.photos/400/200',
      memberCount: 1250,
    },
    {
      id: '2',
      name: 'Fotoğrafçılar',
      image: 'https://picsum.photos/400/201',
      memberCount: 850,
    },
    {
      id: '3',
      name: 'Backpackers',
      image: 'https://picsum.photos/400/202',
      memberCount: 3200,
    },
  ],
  posts: [
    {
      id: '1',
      image: 'https://picsum.photos/400/400',
      caption: 'Harika bir gün batımı 🌅',
      likes: 128,
      comments: 24,
      timestamp: '2 saat önce',
    },
    {
      id: '2',
      image: 'https://picsum.photos/400/401',
      caption: 'Şehrin en güzel manzarası 🏙️',
      likes: 256,
      comments: 32,
      timestamp: '1 gün önce',
    },
  ],
};

// Component props tanımlama
interface ProfileScreenProps {
  isOwnProfile?: boolean;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ isOwnProfile = false }) => {
  const renderCommunityItem = ({ item }: { item: typeof mockProfile.joinedCommunities[0] }) => (
    <TouchableOpacity style={styles.communityCard}>
      <Image source={{ uri: item.image }} style={styles.communityImage} />
      <Text style={styles.communityName} numberOfLines={1}>{item.name}</Text>
      <View style={styles.communityMembers}>
        <MaterialCommunityIcons name="account-group" size={14} color="#666" />
        <Text style={styles.communityMemberCount}>
          {item.memberCount.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderProfileButton = () => {
    if (isOwnProfile) {
      return (
        <TouchableOpacity style={[styles.profileButton, styles.editButton]}>
          <Text style={styles.editButtonText}>Profili Düzenle</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={[styles.profileButton, styles.followButton]}>
        <Text style={styles.followButtonText}>Takip Et</Text>
      </TouchableOpacity>
    );
  };

  return (
    <MainLayout username={mockProfile.username}>
      <ScrollView style={styles.container}>
        {/* Kapak ve Profil Bilgileri */}
        <View style={styles.headerContainer}>
          <ImageBackground
            source={{ uri: mockProfile.coverImage }}
            style={styles.coverImage}
          />
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: mockProfile.profileImage }}
              style={styles.profileImage}
            />
          </View>
        </View>

        <View style={styles.profileInfoContainer}>
          <View style={styles.nameButtonContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{mockProfile.name}</Text>
              <Text style={styles.username}>{mockProfile.username}</Text>
            </View>
            {renderProfileButton()}
          </View>
          <View style={styles.followContainer}>
            <TouchableOpacity style={styles.followItem}>
              <Text style={styles.followCount}>{mockProfile.following}</Text>
              <Text style={styles.followLabel}>Takip Edilen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followItem}>
              <Text style={styles.followCount}>{mockProfile.followers}</Text>
              <Text style={styles.followLabel}>Takipçi</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bio ve Detaylar */}
        <View style={styles.bioSection}>
          <Text style={styles.bio}>{mockProfile.bio}</Text>
          
          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Hobiler</Text>
            <View style={styles.tagContainer}>
              {mockProfile.hobbies.map((hobby, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{hobby}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailTitle}>Bilinen Diller</Text>
            <View style={styles.tagContainer}>
              {mockProfile.languages.map((language, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{language}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Üye Olunan Topluluklar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Üye Olduğu Topluluklar</Text>
          <FlatList
            data={mockProfile.joinedCommunities}
            renderItem={renderCommunityItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.communitiesList}
          />
        </View>

        {/* Gönderiler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gönderiler</Text>
          <FlatList
            data={mockProfile.posts}
            renderItem={({ item }) => (
              <Post
                username={mockProfile.name}
                userImage={mockProfile.profileImage}
                postImage={item.image}
                caption={item.caption}
                likes={item.likes}
                timestamp={item.timestamp}
              />
            )}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
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
  headerContainer: {
    position: 'relative',
  },
  coverImage: {
    height: 180,
    width: '100%',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: -60,
    left: 16,
    zIndex: 2,
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 64,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileInfoContainer: {
    backgroundColor: '#fff',
    paddingTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nameButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginTop: 1,
  },
  bioSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  communitiesList: {
    paddingHorizontal: 16,
  },
  communityCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  communityImage: {
    width: '100%',
    height: 90,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  communityName: {
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    paddingBottom: 4,
  },
  communityMembers: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  communityMemberCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  followContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  followItem: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  followCount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  followLabel: {
    fontSize: 15,
    color: '#666',
    marginLeft: 4,
  },
  profileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 12,
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  followButton: {
    backgroundColor: '#000',
  },
  editButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ProfileScreen; 