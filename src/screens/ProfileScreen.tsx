import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { usePostStore } from '../stores/postStore';
import ProfileComponent from '../components/ProfileComponent';
import { Badge } from '../stores/userStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  // Mock user data (normalde useAuthStore'dan gelecek)
  const mockUser = {
    id: '1',
    name: 'Deniz Ayhan',
    username: 'denizayhan04',
    email: 'deniz@example.com',
    profileImage: 'https://picsum.photos/200',
    coverImage: 'https://picsum.photos/800/400',
    bio: 'React Native Developer 👨‍💻',
    followers_count: 120,
    following_count: 150,
    points: 750,
    badges: [
      {
        id: '1',
        name: '1 Yıllık Üye',
        description: 'Bir yıldır aramızda',
        image: 'https://picsum.photos/100',
        type: 'time' as const,
        earned_at: '2024-03-21T10:00:00Z',
      },
      {
        id: '2',
        name: 'Gezgin',
        description: '10 seyahat gönderisi paylaştı',
        image: 'https://picsum.photos/101',
        type: 'achievement' as const,
        earned_at: '2024-03-21T10:00:00Z',
      },
    ] as Badge[],
    hobbies: ['Coding', 'Photography', 'Travel'],
    languages: ['Turkish', 'English', 'German'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-03-21T10:00:00Z',
    travel_listings: [
      {
        id: '1',
        title: 'Kapadokya Gezisi',
        destination: 'Nevşehir, Türkiye',
        startDate: '2024-04-15',
        endDate: '2024-04-20',
        participants: 4,
        maxParticipants: 6,
        status: 'active' as const,
      },
      {
        id: '2',
        title: 'Amsterdam Turu',
        destination: 'Amsterdam, Hollanda',
        startDate: '2024-05-01',
        endDate: '2024-05-07',
        participants: 3,
        maxParticipants: 5,
        status: 'active' as const,
      },
      {
        id: '3',
        title: 'Paris Gezisi',
        destination: 'Paris, Fransa',
        startDate: '2024-03-01',
        endDate: '2024-03-07',
        participants: 5,
        maxParticipants: 5,
        status: 'completed' as const,
      }
    ]
  };

  // Mock posts data (normalde usePostStore'dan gelecek)
  const mockPosts = [
    {
      id: '1',
      user_id: mockUser.id,
      content: 'Yeni projem üzerinde çalışıyorum! 💻',
      images: ['https://picsum.photos/400/300'],
      likes_count: 42,
      comments_count: 5,
      created_at: '2024-03-20T14:30:00Z',
      updated_at: '2024-03-20T14:30:00Z',
      user: {
        id: mockUser.id,
        name: mockUser.name,
        username: mockUser.username,
        profileImage: mockUser.profileImage,
      }
    },
    {
      id: '2',
      user_id: mockUser.id,
      content: 'Güzel bir gün! ☀️',
      images: ['https://picsum.photos/400/301'],
      likes_count: 28,
      comments_count: 3,
      created_at: '2024-03-19T10:15:00Z',
      updated_at: '2024-03-19T10:15:00Z',
      user: {
        id: mockUser.id,
        name: mockUser.name,
        username: mockUser.username,
        profileImage: mockUser.profileImage,
      }
    }
  ];

  return (
    <ProfileComponent
      profileData={mockUser}
      posts={mockPosts}
      isOwnProfile={true}
      postsLoading={false}
      onEditPress={() => {
        // TODO: Implement edit profile functionality
        console.log('Edit profile pressed');
      }}
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
  },
});

export default ProfileScreen; 