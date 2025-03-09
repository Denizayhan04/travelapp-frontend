import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotificationStore } from '../stores/notificationStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NotificationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const { notifications, loading, error, fetchNotifications, markAsRead } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleUserPress = (userId: string) => {
    navigation.navigate('UserProfile', { userId });
  };

  const renderNotification = ({ item }: { item: typeof notifications[0] }) => {
    const getNotificationContent = () => {
      switch (item.type) {
        case 'follow':
          return (
            <Text style={styles.notificationText}>
              <Text style={styles.username} onPress={() => handleUserPress(item.user.id)}>
                {item.user.name}
              </Text>
              {' seni takip etmeye başladı'}
            </Text>
          );
        case 'like':
          return (
            <Text style={styles.notificationText}>
              <Text style={styles.username} onPress={() => handleUserPress(item.user.id)}>
                {item.user.name}
              </Text>
              {' gönderini beğendi'}
            </Text>
          );
        case 'comment':
          return (
            <Text style={styles.notificationText}>
              <Text style={styles.username} onPress={() => handleUserPress(item.user.id)}>
                {item.user.name}
              </Text>
              {' gönderine yorum yaptı: '}
              {item.comment}
            </Text>
          );
        case 'community':
          return (
            <Text style={styles.notificationText}>
              <Text style={styles.username} onPress={() => handleUserPress(item.user.id)}>
                {item.user.name}
              </Text>
              {' '}
              {item.communityName}
              {' topluluğuna katıldı'}
            </Text>
          );
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
        onPress={() => markAsRead(item.id)}
      >
        <TouchableOpacity onPress={() => handleUserPress(item.user.id)}>
          <Image source={{ uri: item.user.image }} style={styles.userImage} />
        </TouchableOpacity>
        <View style={styles.notificationContent}>
          {getNotificationContent()}
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

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Bir hata oluştu: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  username: {
    fontWeight: '600',
    color: '#000',
  },
});

export default NotificationsScreen; 