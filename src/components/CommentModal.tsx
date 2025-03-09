import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ visible, onClose, postId }) => {
  const [newComment, setNewComment] = useState('');
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  
  // Mock comments - Bu kısmı gerçek verilerle değiştireceğiz
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: '2',
      username: 'ahmetyilmaz',
      text: 'Harika bir gönderi! 👏',
      timestamp: '2 saat önce',
    },
    {
      id: '2',
      userId: '3',
      username: 'mehmetkaya',
      text: 'Katılıyorum 👍',
      timestamp: '1 saat önce',
    },
  ]);

  useEffect(() => {
    if (visible) {
      // Modal açıldığında yukarı animasyon
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 14,
      }).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateY.extractOffset();
      },
      onPanResponderMove: (_, { dy }) => {
        // Yukarı ve aşağı sürüklemeye izin ver, ama limitleri koru
        if (dy >= -50 && dy <= SCREEN_HEIGHT) {
          translateY.setValue(dy);
        }
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        translateY.flattenOffset();

        // Hızlı sürükleme kontrolü
        if (Math.abs(vy) > 0.5) {
          if (vy > 0) {
            // Aşağı hızlı sürükleme - kapat
            Animated.timing(translateY, {
              toValue: SCREEN_HEIGHT,
              duration: 250,
              useNativeDriver: true,
            }).start(onClose);
          } else {
            // Yukarı hızlı sürükleme - en üste
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 0,
            }).start();
          }
          return;
        }

        // Normal sürükleme kontrolü
        if (dy > SCREEN_HEIGHT * 0.2) {
          // Kapat
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          // Başlangıç pozisyonuna dön
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
    })
  ).current;

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: String(Date.now()),
        userId: '1', // Gerçek uygulamada oturum açmış kullanıcının ID'si
        username: 'currentuser', // Gerçek uygulamada oturum açmış kullanıcının adı
        text: newComment.trim(),
        timestamp: 'Şimdi',
      };

      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentUsername}>@{item.username}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentTime}>{item.timestamp}</Text>
    </View>
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View {...panResponder.panHandlers} style={styles.header}>
            <View style={styles.dragIndicator} />
            <Text style={styles.headerTitle}>Yorumlar</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#536471" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
            style={styles.commentsList}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.input}
              placeholder="Yorumunuzu yazın..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !newComment.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleAddComment}
              disabled={!newComment.trim()}
            >
              <MaterialCommunityIcons
                name="send"
                size={24}
                color={newComment.trim() ? '#4A80F0' : '#ccc'}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT,
    paddingTop: Platform.OS === 'ios' ? 44 : 24, // Status bar yüksekliği için padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F1419',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  commentsList: {
    flex: 1,
  },
  commentItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F1419',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#0F1419',
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#536471',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFF3F4',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    fontSize: 14,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default CommentModal; 