import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../layouts/MainLayout';

// Örnek veri
const travelListings = [
  {
    id: '1',
    location: 'Londra, İngiltere',
    dateRange: '15 Haziran - 22 Haziran 2024',
    user: {
      name: 'Ahmet',
      age: 25,
      gender: 'Erkek',
      profileImage: 'https://picsum.photos/200',
    },
    description: 'Londra\'ya ilk defa gideceğim. Şehri keşfetmek, müzeleri gezmek ve yerel lezzetleri tatmak istiyorum. Beraber seyahat etmek isteyen var mı?',
  },
  {
    id: '2',
    location: 'Amsterdam, Hollanda',
    dateRange: '1 Temmuz - 7 Temmuz 2024',
    user: {
      name: 'Ayşe',
      age: 23,
      gender: 'Kadın',
      profileImage: 'https://picsum.photos/201',
    },
    description: 'Amsterdam\'da bisiklet turu yapmak, Van Gogh müzesini gezmek ve kanal turuna çıkmak istiyorum. Programım esnek, birlikte planlayabiliriz.',
  },
];

const MatchScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleMessagePress = (userId: string) => {
    console.log('Message button pressed for user:', userId);
    // Mesajlaşma ekranına yönlendirme yapılacak
  };

  const handleProfilePress = (userId: string) => {
    // @ts-ignore - Tip hatası için geçici çözüm
    navigation.navigate('Profile', { userId });
  };

  const renderTravelCard = ({ item }: { item: typeof travelListings[0] }) => (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={() => handleProfilePress(item.id)}>
          <Image 
            source={{ uri: item.user.profileImage }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <View style={styles.userDetails}>
          <TouchableOpacity onPress={() => handleProfilePress(item.id)}>
            <Text style={styles.userName}>
              {item.user.name}, {item.user.age}
              <Text style={styles.userGender}> • {item.user.gender}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.travelInfo}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
          <Text style={styles.location}>{item.location}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="calendar-range" size={20} color="#666" />
          <Text style={styles.dateRange}>{item.dateRange}</Text>
        </View>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <TouchableOpacity 
        style={styles.messageButton}
        onPress={() => handleMessagePress(item.id)}
      >
        <MaterialCommunityIcons name="message-text" size={20} color="#fff" />
        <Text style={styles.messageButtonText}>Mesaj Gönder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <FlatList
          data={travelListings}
          renderItem={renderTravelCard}
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
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userGender: {
    color: '#666',
    fontWeight: 'normal',
  },
  travelInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 15,
    marginLeft: 8,
    color: '#333',
  },
  dateRange: {
    fontSize: 14,
    marginLeft: 8,
    color: '#666',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
    marginBottom: 16,
  },
  messageButton: {
    backgroundColor: '#4A80F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default MatchScreen; 