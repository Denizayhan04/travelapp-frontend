import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Örnek bildirim verileri
const mockNotifications = [
  {
    id: '1',
    type: 'follow',
    user: {
      name: 'Ahmet Yılmaz',
      image: 'https://picsum.photos/200',
    },
    time: '2 saat önce',
    isRead: false,
  },
  {
    id: '2',
    type: 'like',
    user: {
      name: 'Mehmet Kaya',
      image: 'https://picsum.photos/201',
    },
    postImage: 'https://picsum.photos/400',
    time: '3 saat önce',
    isRead: false,
  },
  {
    id: '3',
    type: 'comment',
    user: {
      name: 'Ayşe Demir',
      image: 'https://picsum.photos/202',
    },
    comment: 'Harika bir yer! Bende gitmek istiyorum 😊',
    time: '5 saat önce',
    isRead: true,
  },
  {
    id: '4',
    type: 'community',
    user: {
      name: 'Fatma Öztürk',
      image: 'https://picsum.photos/203',
    },
    communityName: 'Gezginler Kulübü',
    time: '1 gün önce',
    isRead: true,
  },
];

const NotificationsScreen: React.FC = () => {
  const renderNotification = ({ item }: { item: typeof mockNotifications[0] }) => {
    const getNotificationContent = () => {
      switch (item.type) {
        case 'follow':
          return `${item.user.name} seni takip etmeye başladı`;
        case 'like':
          return `${item.user.name} gönderini beğendi`;
        case 'comment':
          return `${item.user.name} gönderine yorum yaptı: ${item.comment}`;
        case 'community':
          return `${item.user.name} ${item.communityName} topluluğuna katıldı`;
        default:
          return '';
      }
    };

    const getNotificationIcon = () => {
      switch (item.type) {
        case 'follow':
          return 'account-plus';
        case 'like':
          return 'heart';
        case 'comment':
          return 'comment-text';
        case 'community':
          return 'account-group';
        default:
          return 'bell';
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          !item.isRead && styles.unreadNotification,
        ]}
      >
        <Image source={{ uri: item.user.image }} style={styles.userImage} />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>{getNotificationContent()}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <MaterialCommunityIcons
          name={getNotificationIcon()}
          size={24}
          color="#666"
          style={styles.typeIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockNotifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Bildirim bulunmuyor</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  unreadNotification: {
    backgroundColor: '#f8f9fa',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  notificationText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  typeIcon: {
    marginLeft: 8,
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
  },
});

export default NotificationsScreen; 