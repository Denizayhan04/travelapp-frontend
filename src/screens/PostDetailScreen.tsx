import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import Post from '../components/Post';

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

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
  user: {
    id: '1',
    name: 'Ahmet Yılmaz',
    username: '@ahmetyilmaz',
    image: 'https://picsum.photos/200',
  },
  content: 'Bu harika bir gönderi!',
  images: ['https://picsum.photos/400'],
  likes: 42,
  comments: 12,
  time: '2 saat önce',
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
  const { postId } = route.params;

  // Burada postId kullanılarak gerçek veriyi çekeceğiz
  // Şimdilik mock veriyi kullanıyoruz
  const post = mockPost;

  const renderComment = (comment: Comment) => (
    <View key={comment.id} style={styles.commentContainer}>
      <TouchableOpacity style={styles.commentHeader}>
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

  return (
    <ScrollView style={styles.container}>
      <Post {...post} isDetailView={true} />
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Yorumlar</Text>
        {mockComments.map(renderComment)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
});

export default PostDetailScreen; 