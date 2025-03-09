import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Post from './Post';
import { Post as PostType } from '../stores/postStore';
import { Badge as BadgeType, TravelListing as TravelListingType } from '../stores/userStore';

export interface ProfileData {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string;
  coverImage: string;
  bio: string;
  followers_count: number;
  following_count: number;
  points: number;
  badges: BadgeType[];
  hobbies: string[];
  languages: string[];
  created_at: string;
  updated_at: string;
  isFollowing?: boolean;
  travel_listings?: TravelListingType[];
}

interface ProfileComponentProps {
  profileData: ProfileData;
  posts: PostType[];
  isOwnProfile: boolean;
  postsLoading: boolean;
  onEditPress?: () => void;
  onFollowPress?: () => void;
  onTravelListingPress?: (listingId: string) => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  profileData,
  posts,
  isOwnProfile,
  postsLoading,
  onEditPress,
  onFollowPress,
  onTravelListingPress,
}) => {
  const renderHobbyItem = ({ item }: { item: string }) => (
    <View style={styles.hobbyItem}>
      <Text style={styles.hobbyText}>{item}</Text>
    </View>
  );

  const renderLanguageItem = ({ item }: { item: string }) => (
    <View style={styles.languageItem}>
      <Text style={styles.languageText}>{item}</Text>
    </View>
  );

  const renderBadgeItem = ({ item }: { item: BadgeType }) => (
    <View style={styles.badgeItem}>
      <Image source={{ uri: item.image }} style={styles.badgeImage} />
      <View style={styles.badgeInfo}>
        <Text style={styles.badgeName}>{item.name}</Text>
        <Text style={styles.badgeDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const renderTravelListing = ({ item }: { item: TravelListingType }) => (
    <TouchableOpacity
      style={styles.travelListingCard}
      onPress={() => onTravelListingPress?.(item.id)}
    >
      <View style={styles.travelListingHeader}>
        <Text style={styles.travelListingTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, styles[`status${item.status}`]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.travelListingInfo}>
        <View style={styles.travelListingDetail}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
          <Text style={styles.travelListingText}>{item.destination}</Text>
        </View>
        <View style={styles.travelListingDetail}>
          <MaterialCommunityIcons name="calendar" size={16} color="#666" />
          <Text style={styles.travelListingText}>
            {new Date(item.startDate).toLocaleDateString('tr-TR')} -{' '}
            {new Date(item.endDate).toLocaleDateString('tr-TR')}
          </Text>
        </View>
        <View style={styles.travelListingDetail}>
          <MaterialCommunityIcons name="account-group" size={16} color="#666" />
          <Text style={styles.travelListingText}>
            {item.participants}/{item.maxParticipants} Katılımcı
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image */}
      <Image source={{ uri: profileData.coverImage }} style={styles.coverImage} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: profileData.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.nameSection}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.username}>{profileData.username}</Text>
        </View>

        {/* Action Button */}
        {isOwnProfile ? (
          <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
            <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Düzenle</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.followButton,
              profileData.isFollowing && styles.followingButton,
            ]}
            onPress={onFollowPress}
          >
            <Text
              style={[
                styles.followButtonText,
                profileData.isFollowing && styles.followingButtonText,
              ]}
            >
              {profileData.isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Bio */}
        {profileData.bio && <Text style={styles.bio}>{profileData.bio}</Text>}

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.followers_count}</Text>
            <Text style={styles.statLabel}>Takipçi</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.following_count}</Text>
            <Text style={styles.statLabel}>Takip</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.points}</Text>
            <Text style={styles.statLabel}>Puan</Text>
          </View>
        </View>

        {/* Badges */}
        {profileData.badges && profileData.badges.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Rozetler</Text>
            <FlatList
              data={profileData.badges}
              renderItem={renderBadgeItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesList}
            />
          </View>
        )}

        {/* Hobbies */}
        {profileData.hobbies && profileData.hobbies.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Hobiler</Text>
            <FlatList
              data={profileData.hobbies}
              renderItem={renderHobbyItem}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hobbiesList}
            />
          </View>
        )}

        {/* Languages */}
        {profileData.languages && profileData.languages.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Diller</Text>
            <FlatList
              data={profileData.languages}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.languagesList}
            />
          </View>
        )}
      </View>

      {/* Travel Listings */}
      {profileData.travel_listings && profileData.travel_listings.length > 0 && (
        <View style={[styles.sectionContainer, styles.travelListingsSection]}>
          <Text style={styles.sectionTitle}>Seyahat İlanları</Text>
          <FlatList
            data={profileData.travel_listings}
            renderItem={renderTravelListing}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.travelListingsContainer}
          />
        </View>
      )}

      {/* Posts */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Gönderiler</Text>
        {postsLoading ? (
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        ) : posts.length === 0 ? (
          <Text style={styles.noPostsText}>Henüz gönderi yok</Text>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              {...post}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  profileSection: {
    padding: 16,
    marginTop: -40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameSection: {
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A80F0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  followButton: {
    backgroundColor: '#4A80F0',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  followingButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4A80F0',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  followingButtonText: {
    color: '#4A80F0',
  },
  bio: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  statItem: {
    marginRight: 24,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  badgesList: {
    paddingVertical: 8,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  badgeInfo: {
    marginLeft: 8,
    maxWidth: 120,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  hobbiesList: {
    paddingVertical: 8,
  },
  hobbyItem: {
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  hobbyText: {
    color: '#333',
    fontSize: 14,
  },
  languagesList: {
    paddingVertical: 8,
  },
  languageItem: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  languageText: {
    color: '#4A80F0',
    fontSize: 14,
  },
  postsSection: {
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  noPostsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  travelListingsSection: {
    marginLeft: 16,
  },
  travelListingsContainer: {
    paddingVertical: 8,
  },
  travelListingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  travelListingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  travelListingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusactive: {
    backgroundColor: '#e8f5e9',
  },
  statuscompleted: {
    backgroundColor: '#e3f2fd',
  },
  statuscancelled: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  travelListingInfo: {
    gap: 8,
  },
  travelListingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  travelListingText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileComponent; 