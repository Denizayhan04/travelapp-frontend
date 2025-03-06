import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

// Örnek mesaj verileri
const mockMessages = [
  {
    id: '1',
    user: {
      name: 'Ahmet Yılmaz',
      image: 'https://picsum.photos/200',
    },
    lastMessage: 'Merhaba, yarın geziye katılacak mısın?',
    time: '10:30',
    unreadCount: 2,
  },
  {
    id: '2',
    user: {
      name: 'Mehmet Kaya',
      image: 'https://picsum.photos/201',
    },
    lastMessage: 'Fotoğrafları paylaşır mısın?',
    time: 'Dün',
    unreadCount: 0,
  },
  {
    id: '3',
    user: {
      name: 'Ayşe Demir',
      image: 'https://picsum.photos/202',
    },
    lastMessage: 'Teşekkürler! 😊',
    time: 'Dün',
    unreadCount: 0,
  },
  {
    id: '4',
    user: {
      name: 'Fatma Öztürk',
      image: 'https://picsum.photos/203',
    },
    lastMessage: 'Topluluk etkinliğinde görüşelim',
    time: 'Pazartesi',
    unreadCount: 1,
  },
];

const MessagesScreen: React.FC = () => {
  const renderMessage = ({ item }: { item: typeof mockMessages[0] }) => (
    <TouchableOpacity style={styles.messageItem}>
      <Image source={{ uri: item.user.image }} style={styles.userImage} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.messageFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Mesaj bulunmuyor</Text>
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
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#4A80F0',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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

export default MessagesScreen; 