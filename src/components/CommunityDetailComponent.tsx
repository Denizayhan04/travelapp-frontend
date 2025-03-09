import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Post from './Post';
import { Post as PostType } from '../stores/postStore';

interface TravelListing {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
}

interface CommunityData {
  id: string;
  name: string;
  description: string;
  image: string;
  backgroundImage: string;
  memberCount: number;
  isJoined: boolean;
  rules: string[];
  activeTravelListings?: TravelListing[];
}

interface CommunityDetailComponentProps {
  communityData: CommunityData;
  posts: PostType[];
  onJoinPress: () => void;
  onTravelListingPress: (listingId: string) => void;
}

const CommunityDetailComponent: React.FC<CommunityDetailComponentProps> = ({
  communityData,
  posts,
  onJoinPress,
  onTravelListingPress,
}) => {
  const renderTravelListing = ({ item }: { item: TravelListing }) => (
    <TouchableOpacity
      style={styles.travelListingCard}
      onPress={() => onTravelListingPress(item.id)}
    >
      <View style={styles.travelListingHeader}>
        <Text style={styles.travelListingTitle}>{item.title}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
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
      {/* Background Image */}
      <Image
        source={{ uri: communityData.backgroundImage }}
        style={styles.backgroundImage}
      />

      {/* Community Info Section */}
      <View style={styles.infoSection}>
        <Image
          source={{ uri: communityData.image }}
          style={styles.communityImage}
        />

        <View style={styles.nameSection}>
          <Text style={styles.communityName}>{communityData.name}</Text>
          <Text style={styles.memberCount}>
            {communityData.memberCount} üye
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.joinButton,
            communityData.isJoined && styles.leaveButton,
          ]}
          onPress={onJoinPress}
        >
          <Text
            style={[
              styles.joinButtonText,
              communityData.isJoined && styles.leaveButtonText,
            ]}
          >
            {communityData.isJoined ? 'Ayrıl' : 'Katıl'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.description}>{communityData.description}</Text>
      </View>

      {/* Rules Section */}
      <View style={styles.rulesSection}>
        <Text style={styles.sectionTitle}>Topluluk Kuralları</Text>
        {communityData.rules.map((rule, index) => (
          <View key={index} style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>{index + 1}.</Text>
            <Text style={styles.ruleText}>{rule}</Text>
          </View>
        ))}
      </View>

      {/* Active Travel Listings */}
      {communityData.activeTravelListings && communityData.activeTravelListings.length > 0 && (
        <View style={styles.travelListingsSection}>
          <Text style={styles.sectionTitle}>Aktif Seyahat İlanları</Text>
          <FlatList
            data={communityData.activeTravelListings}
            renderItem={renderTravelListing}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.travelListingsContainer}
          />
        </View>
      )}

      {/* Posts Section */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Gönderiler</Text>
        {posts.map((post) => (
          <Post
            key={post.id}
            {...post}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  communityImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  nameSection: {
    marginTop: 12,
  },
  communityName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  memberCount: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  joinButton: {
    backgroundColor: '#4A80F0',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  leaveButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  leaveButtonText: {
    color: '#ff3b30',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginTop: 16,
  },
  rulesSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ruleNumber: {
    fontSize: 16,
    color: '#666',
    width: 24,
  },
  ruleText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  travelListingsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  postsSection: {
    padding: 16,
  },
});

export default CommunityDetailComponent; 