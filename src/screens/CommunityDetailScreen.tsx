import React from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import CommunityDetailComponent from '../components/CommunityDetailComponent';
import { Post } from '../stores/postStore';

type CommunityDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CommunityDetailScreenRouteProp = RouteProp<RootStackParamList, 'CommunityDetail'>;

const CommunityDetailScreen: React.FC = () => {
  const route = useRoute<CommunityDetailScreenRouteProp>();
  const navigation = useNavigation<CommunityDetailScreenNavigationProp>();
  const { communityId } = route.params;

  // Mock data (normalde API'den gelecek)
  const mockCommunityData = {
    id: communityId,
    name: 'Gezgin Ruhlular',
    description: 'Seyahat etmeyi seven, yeni yerler keşfetmekten hoşlanan gezginlerin buluşma noktası. Birlikte seyahat planları yapıp, deneyimlerimizi paylaşıyoruz.',
    image: 'https://picsum.photos/200',
    backgroundImage: 'https://picsum.photos/800/400',
    memberCount: 1250,
    isJoined: false,
    rules: [
      'Saygılı ve yapıcı iletişim kurun',
      'Spam ve reklam içerikli paylaşımlar yasaktır',
      'Seyahat deneyimlerinizi detaylı bir şekilde paylaşın',
      'Fotoğraf ve videoları uygun etiketlerle paylaşın',
      'Diğer üyelerin sorularına yardımcı olmaya çalışın',
    ],
    activeTravelListings: [
      {
        id: '1',
        title: 'Kapadokya Gezisi',
        destination: 'Nevşehir, Türkiye',
        startDate: '2024-04-15',
        endDate: '2024-04-20',
        participants: 4,
        maxParticipants: 6,
      },
      {
        id: '2',
        title: 'Amsterdam Turu',
        destination: 'Amsterdam, Hollanda',
        startDate: '2024-05-01',
        endDate: '2024-05-07',
        participants: 3,
        maxParticipants: 5,
      },
    ],
  };

  // Mock posts data
  const mockPosts: Post[] = [
    {
      id: '1',
      user_id: '123',
      content: 'Kapadokya\'da muhteşem bir gün! Balon turu harikaydı 🎈',
      images: ['https://picsum.photos/400/300'],
      likes_count: 42,
      comments_count: 5,
      created_at: '2024-03-20T14:30:00Z',
      updated_at: '2024-03-20T14:30:00Z',
      user: {
        id: '123',
        name: 'Ahmet Yılmaz',
        username: 'ahmetyilmaz',
        profileImage: 'https://picsum.photos/200',
      },
    },
    {
      id: '2',
      user_id: '124',
      content: 'Amsterdam kanallarında tekne turu 🚤',
      images: ['https://picsum.photos/400/301'],
      likes_count: 38,
      comments_count: 4,
      created_at: '2024-03-19T10:15:00Z',
      updated_at: '2024-03-19T10:15:00Z',
      user: {
        id: '124',
        name: 'Ayşe Demir',
        username: 'aysedemir',
        profileImage: 'https://picsum.photos/201',
      },
    },
  ];

  const handleJoinPress = () => {
    // TODO: Implement join/leave functionality
    console.log('Join/Leave pressed for community:', communityId);
  };

  const handleTravelListingPress = (listingId: string) => {
    // TODO: Navigate to travel listing detail
    console.log('Travel listing pressed:', listingId);
  };

  return (
    <CommunityDetailComponent
      communityData={mockCommunityData}
      posts={mockPosts}
      onJoinPress={handleJoinPress}
      onTravelListingPress={handleTravelListingPress}
    />
  );
};

export default CommunityDetailScreen; 