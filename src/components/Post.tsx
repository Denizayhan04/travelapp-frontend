import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommentModal from './CommentModal';

interface PostProps {
  username: string;
  userImage: string;
  postImage: string;
  caption: string;
  likes: number;
  timestamp: string;
  taggedUsers?: Array<{
    username: string;
  }>;
}

const Post: React.FC<PostProps> = ({
  username,
  userImage,
  postImage,
  caption,
  likes,
  timestamp,
  taggedUsers,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  
  // Örnek yorum verisi - gerçek uygulamada bu veriler API'den gelecektir
  const [comments, setComments] = useState([
    {
      id: '1',
      username: 'ahmet',
      text: 'Harika bir fotoğraf! 📸',
      timestamp: '2 saat önce'
    },
    {
      id: '2',
      username: 'mehmet',
      text: 'Çok güzel olmuş 👏',
      timestamp: '1 saat önce'
    }
  ]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleCommentPress = () => {
    console.log('Opening comments modal, current state:', !showComments);
    setShowComments(!showComments);
  };

  const handleCloseComments = () => {
    console.log('Closing comments modal');
    setShowComments(false);
  };

  const handleAddComment = (text: string) => {
    const newComment = {
      id: String(comments.length + 1),
      username: 'currentUser', // Gerçek uygulamada oturum açmış kullanıcının adı gelecek
      text: text,
      timestamp: 'Şimdi'
    };
    setComments([...comments, newComment]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: userImage }} style={styles.userImage} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{username}</Text>
          {taggedUsers && taggedUsers.length > 0 && (
            <Text style={styles.taggedUsers}>
              ile birlikte{' '}
              {taggedUsers.map((user, index) => (
                <Text key={index} style={styles.taggedUsername}>
                  {user.username}
                  {index < taggedUsers.length - 1 ? ', ' : ''}
                </Text>
              ))}
            </Text>
          )}
        </View>
      </View>

      <Image source={{ uri: postImage }} style={styles.postImage} />

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <MaterialCommunityIcons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={28}
            color={isLiked ? '#ff3b30' : '#000'}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleCommentPress} style={styles.actionButton}>
          <MaterialCommunityIcons name="comment-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.likes}>{likesCount} beğeni</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{username}</Text> {caption}
        </Text>
        <TouchableOpacity onPress={handleCommentPress}>
          <Text style={styles.viewComments}>
            {comments.length} yorumun tümünü gör
          </Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>

      <CommentModal
        visible={showComments}
        onClose={handleCloseComments}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontWeight: '600',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
  },
  actionButton: {
    marginRight: 16,
  },
  info: {
    padding: 10,
  },
  likes: {
    fontWeight: '600',
    marginBottom: 4,
  },
  caption: {
    marginBottom: 4,
  },
  viewComments: {
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  taggedUsers: {
    fontSize: 13,
    color: '#666',
  },
  taggedUsername: {
    fontWeight: '600',
    color: '#262626',
  },
});

export default Post; 