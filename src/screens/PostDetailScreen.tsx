import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Post from '../components/Post';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '../layouts/MainLayout';

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;
type PostDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
  text: string;
  time: string;
}

// Mock post data - Bu kısmı gerçek verilerle değiştireceğiz
const mockPost = {
  id: '1',
  user_id: '1',
  content: 'Bu harika bir gönderi!',
  images: [{ id: '1', image_url: 'https://picsum.photos/400', order: 1 }],
  likes_count: 42,
  comments_count: 12,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  user: {
    id: '1',
    name: 'Ahmet Yılmaz',
    username: 'ahmetyilmaz',
    profileImage: 'https://picsum.photos/200',
  }
};

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      id: '2',
      name: 'Mehmet Kaya',
      username: '@mehmetkaya',
      image: 'https://picsum.photos/201',
    },
    text: 'Harika bir paylaşım! 👏',
    time: '1 saat önce',
  },
  {
    id: '2',
    user: {
      id: '3',
      name: 'Ayşe Demir',
      username: '@aysedemir',
      image: 'https://picsum.photos/202',
    },
    text: 'Çok güzel olmuş 😊',
    time: '45 dakika önce',
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Ayşe Demir',
      username: '@aysedemir',
      image: 'https://picsum.photos/202',
    },
    text: 'Çok güzel olmuş 😊',
    time: '45 dakika önce',
  },
  {
    id: '4',
    user: {
      id: '3',
      name: 'Ayşe Demir',
      username: '@aysedemir',
      image: 'https://picsum.photos/202',
    },
    text: 'Çok güzel olmuş 😊',
    time: '45 dakika önce',
  },
  // Daha fazla yorum eklenebilir
];

const PostDetailScreen: React.FC = () => {
  const route = useRoute<PostDetailScreenRouteProp>();
  const navigation = useNavigation<PostDetailScreenNavigationProp>();
  const { postId, focusComment } = route.params;
  const scrollViewRef = useRef<ScrollView>(null);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(mockComments);

  const handleCommentUserPress = (userId: string) => {
    navigation.navigate('UserProfile', { userId });
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(), // Gerçek uygulamada backend'den gelecek
      user: {
        id: '1', // Gerçek uygulamada current user'dan gelecek
        name: 'Kullanıcı Adı',
        username: '@kullanici',
        image: 'https://picsum.photos/200',
      },
      text: commentText.trim(),
      time: 'Şimdi'
    };

    setLocalComments(prevComments => [newComment, ...prevComments]);
    setCommentText('');
    Keyboard.dismiss();

    // Yeni yorumu göstermek için scroll yapıyoruz
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderComment = (comment: Comment) => (
    <View key={comment.id} style={styles.commentContainer}>
      <TouchableOpacity 
        style={styles.commentHeader}
        onPress={() => handleCommentUserPress(comment.user.id)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: comment.user.image }} style={styles.commentUserImage} />
        <View style={styles.commentUserInfo}>
          <Text style={styles.commentUserName}>{comment.user.name}</Text>
          <Text style={styles.commentUsername}>{comment.user.username}</Text>
        </View>
        <Text style={styles.commentTime}>{comment.time}</Text>
      </TouchableOpacity>
      <Text style={styles.commentText}>{comment.text}</Text>
    </View>
  );

  React.useEffect(() => {
    if (focusComment && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 500);
    }
  }, [focusComment]);

  return (
    <MainLayout>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContent}
        >
          <Post post={mockPost} />
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Yorumlar</Text>
            {localComments.map(renderComment)}
          </View>
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Yorum yaz..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={1000}
            autoCorrect={false}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !commentText.trim() && styles.sendButtonDisabled
            ]} 
            onPress={handleSendComment}
            disabled={!commentText.trim()}
          >
            <Ionicons 
              name="send" 
              size={24} 
              color={commentText.trim() ? "#4A80F0" : "#999"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80, // Yorum yazma alanı için extra padding
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  commentContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentUserImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  commentUserInfo: {
    flex: 1,
    marginLeft: 12,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  commentUsername: {
    fontSize: 13,
    color: '#536471',
  },
  commentTime: {
    fontSize: 13,
    color: '#536471',
  },
  commentText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
    marginLeft: 48,
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EFF3F4',
  },
  commentInput: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default PostDetailScreen; 