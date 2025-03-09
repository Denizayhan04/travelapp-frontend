import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MainLayout from '../layouts/MainLayout';

type CommunitiesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Örnek veri
const mockCommunities = {
  joined: [
    {
      id: '1',
      name: 'Gezginler Kulübü',
      description: 'Dünyayı gezmek ve yeni yerler keşfetmek isteyenler için topluluk.',
      image: 'https://picsum.photos/400/200',
      memberCount: 1250,
      isJoined: true,
    },
    {
      id: '2',
      name: 'Fotoğrafçılar',
      description: 'Seyahat fotoğrafçılığı tutkunları için özel topluluk.',
      image: 'https://picsum.photos/400/201',
      memberCount: 850,
      isJoined: true,
    },
  ],
  suggested: [
    {
      id: '3',
      name: 'Backpackers',
      description: 'Sırt çantalı gezginlerin deneyim paylaşım platformu.',
      image: 'https://picsum.photos/400/202',
      memberCount: 3200,
      isJoined: false,
    },
    {
      id: '4',
      name: 'Solo Travelers',
      description: 'Yalnız seyahat edenler için rehberlik ve arkadaşlık topluluğu.',
      image: 'https://picsum.photos/400/203',
      memberCount: 1500,
      isJoined: false,
    },
  ],
};

const CommunitiesScreen: React.FC = () => {
  const navigation = useNavigation<CommunitiesScreenNavigationProp>();
  const [communities, setCommunities] = useState(mockCommunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState(mockCommunities);

  // Arama sonuçlarını filtrele
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = {
        joined: communities.joined.filter(
          community =>
            community.name.toLowerCase().includes(query) ||
            community.description.toLowerCase().includes(query)
        ),
        suggested: communities.suggested.filter(
          community =>
            community.name.toLowerCase().includes(query) ||
            community.description.toLowerCase().includes(query)
        ),
      };
      setFilteredCommunities(filtered);
    } else {
      setFilteredCommunities(communities);
    }
  }, [searchQuery, communities]);

  const handleJoinPress = (communityId: string) => {
    setCommunities(prev => {
      const allCommunities = [...prev.joined, ...prev.suggested];
      const updatedCommunity = allCommunities.find(c => c.id === communityId);
      
      if (updatedCommunity) {
        if (updatedCommunity.isJoined) {
          // Topluluktan çık
          return {
            joined: prev.joined.filter(c => c.id !== communityId),
            suggested: [...prev.suggested, { ...updatedCommunity, isJoined: false }],
          };
        } else {
          // Topluluğa katıl
          return {
            joined: [...prev.joined, { ...updatedCommunity, isJoined: true }],
            suggested: prev.suggested.filter(c => c.id !== communityId),
          };
        }
      }
      return prev;
    });
  };

  const handleCommunityPress = (communityId: string) => {
    navigation.navigate('CommunityDetail', { communityId });
  };

  const renderCommunityCard = ({ item }: { item: typeof mockCommunities.joined[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCommunityPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.communityImage} />
      
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Text style={styles.communityName}>{item.name}</Text>
          <View style={styles.memberCount}>
            <MaterialCommunityIcons name="account-group" size={20} color="#666" />
            <Text style={styles.memberCountText}>
              {item.memberCount.toLocaleString()}
            </Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <TouchableOpacity
          style={[
            styles.joinButton,
            item.isJoined && styles.joinedButton,
          ]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onPress
            handleJoinPress(item.id);
          }}
        >
          <Text style={[
            styles.joinButtonText,
            item.isJoined && styles.joinedButtonText,
          ]}>
            {item.isJoined ? 'Üye ✓' : 'Katıl'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <MainLayout
      onSearch={(text) => setSearchQuery(text)}
    >
      <View style={styles.container}>
        <FlatList
          data={[
            { title: 'Üye Olduğun Topluluklar', data: filteredCommunities.joined },
            { title: 'Önerilen Topluluklar', data: filteredCommunities.suggested },
          ]}
          renderItem={({ item }) => (
            item.data.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{item.title}</Text>
                <FlatList
                  data={item.data}
                  renderItem={renderCommunityCard}
                  keyExtractor={community => community.id}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            ) : null
          )}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {searchQuery.trim() 
                  ? 'Aradığınız kriterlere uygun topluluk bulunamadı'
                  : 'Henüz topluluk bulunmuyor'}
              </Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  communityImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  communityName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCountText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  joinButton: {
    backgroundColor: '#4A80F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#e8f0fe',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  joinedButtonText: {
    color: '#4A80F0',
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
    textAlign: 'center',
  },
});

export default CommunitiesScreen; 