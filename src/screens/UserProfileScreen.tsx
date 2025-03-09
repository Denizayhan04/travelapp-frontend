import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUserStore } from '../stores/userStore';
import ProfileComponent from '../components/ProfileComponent';
import { usePostStore } from '../stores/postStore';
import { Post } from '../stores/postStore';

type UserProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type UserProfileScreenRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

const UserProfileScreen: React.FC = () => {
  const route = useRoute<UserProfileScreenRouteProp>();
  const navigation = useNavigation<UserProfileScreenNavigationProp>();
  const { userId } = route.params;

  const {
    userProfile,
    loading: userLoading,
    error: userError,
    fetchUserProfile,
    followUser,
    unfollowUser,
  } = useUserStore();

  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId]);

  if (userLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A80F0" />
      </View>
    );
  }

  if (userError || !userProfile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {userError || 'Kullanıcı bulunamadı'}
        </Text>
      </View>
    );
  }

  // Mock posts - userProfile yüklendikten sonra oluştur
  const mockPosts: Post[] = [
    {
      id: '1',
      user_id: userProfile.id,
      content: 'Harika bir gün geçirdim! 🌞',
      images: ['https://picsum.photos/400/300'],
      likes_count: 42,
      comments_count: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user: {
        id: userProfile.id,
        name: userProfile.name,
        username: userProfile.username,
        profileImage: userProfile.profileImage,
      }
    },
    {
      id: '2',
      user_id: userProfile.id,
      content: 'Yeni hobim: Fotoğrafçılık 📸',
      images: ['https://picsum.photos/400/301'],
      likes_count: 28,
      comments_count: 3,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      user: {
        id: userProfile.id,
        name: userProfile.name,
        username: userProfile.username,
        profileImage: userProfile.profileImage,
      }
    },
  ];

  const handleFollowPress = async () => {
    if (userProfile.isFollowing) {
      await unfollowUser(userId);
    } else {
      await followUser(userId);
    }
  };

  return (
    <ProfileComponent
      profileData={{
        id: userProfile.id,
        name: userProfile.name,
        username: userProfile.username,
        email: userProfile.email,
        profileImage: userProfile.profileImage,
        coverImage: userProfile.coverImage,
        bio: userProfile.bio,
        followers_count: userProfile.followers_count,
        following_count: userProfile.following_count,
        points: userProfile.points,
        badges: userProfile.badges,
        hobbies: userProfile.hobbies,
        languages: userProfile.languages,
        created_at: userProfile.created_at,
        updated_at: userProfile.updated_at,
        isFollowing: userProfile.isFollowing,
        travel_listings: userProfile.travel_listings
      }}
      posts={mockPosts}
      isOwnProfile={false}
      onFollowPress={handleFollowPress}
      postsLoading={false}
      onTravelListingPress={(listingId) => {
        // TODO: Implement travel listing detail navigation
        console.log('Travel listing pressed:', listingId);
      }}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
});

export default UserProfileScreen; 