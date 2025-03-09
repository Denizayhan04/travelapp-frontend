import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type PostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PostProps {
  post: {
    id: string;
    user_id: string;
    content: string;
    images: string[];
    likes_count: number;
    comments_count: number;
    created_at: string;
    updated_at: string;
    user: {
      id: string;
      name: string;
      username: string;
      profileImage: string;
    };
  };
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const navigation = useNavigation<PostNavigationProp>();

  const handlePress = () => {
    navigation.navigate('PostDetail', { postId: post.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.profileImage }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{post.user.name}</Text>
          <Text style={styles.username}>@{post.user.username}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.images && post.images.length > 0 && (
        <View style={styles.imageContainer}>
          {post.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.stat}>
          <MaterialCommunityIcons name="heart-outline" size={20} color="#666" />
          <Text style={styles.statText}>{post.likes_count}</Text>
        </View>
        <View style={styles.stat}>
          <MaterialCommunityIcons name="comment-outline" size={20} color="#666" />
          <Text style={styles.statText}>{post.comments_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  imageContainer: {
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
}); 