import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Post as PostType, usePostStore } from '../stores/postStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type PostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PostProps {
  post: PostType;
  onPress?: (postId: string) => void;
}

interface PostImage {
  id: string;
  image_url: string;
  order: number;
}

const Post: React.FC<PostProps> = ({ post, onPress }) => {
  if (!post || !post.user) {
    return null;
  }

  const navigation = useNavigation<PostNavigationProp>();
  const { likePost, unlikePost } = usePostStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const width = Dimensions.get('window').width;
  const carouselRef = useRef<ICarouselInstance>(null);

  const renderImageIndicators = () => {
    if (!post.images || post.images.length <= 1) return null;

    return (
      <View style={styles.indicatorContainer}>
        {post.images.map((_, index: number) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === currentImageIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)' }
            ]}
          />
        ))}
      </View>
    );
  };

  const handlePostPress = () => {
    navigation.navigate('PostDetail', { postId: post.id, focusComment: false });
  };

  const handleUserPress = (event: any) => {
    event.stopPropagation();
    navigation.navigate('UserProfile', { userId: post.user.id });
  };

  const handleOptionsPress = (event: any) => {
    event.stopPropagation();
    // TODO: Show options menu
  };

  const handleLikePress = async (event: any) => {
    event.stopPropagation();
    try {
      if (isLiked) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Like işlemi başarısız:', error);
    }
  };

  const handleCommentPress = (event: any) => {
    event.stopPropagation();
    navigation.navigate('PostDetail', { postId: post.id, focusComment: true });
  };

  const handlePrevImage = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (currentImageIndex > 0) {
      carouselRef.current?.scrollTo({ index: currentImageIndex - 1, animated: true });
    }
  };

  const handleNextImage = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (currentImageIndex < (post.images?.length || 0) - 1) {
      carouselRef.current?.scrollTo({ index: currentImageIndex + 1, animated: true });
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePostPress}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.userInfo} 
          onPress={handleUserPress} 
          activeOpacity={0.8}
        >
          <Image source={{ uri: post.user.profileImage }} style={styles.profileImage} />
          <View>
            <Text style={styles.name}>{post.user.name}</Text>
            <Text style={styles.username}>@{post.user.username}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={handleOptionsPress}
        >
          <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.images && post.images.length > 0 && (
        <View style={styles.imageContainer}>
          <Carousel<PostImage>
            ref={carouselRef}
            loop={false}
            width={width - 30}
            height={width - 30}
            data={post.images}
            scrollAnimationDuration={300}
            onSnapToItem={setCurrentImageIndex}
            renderItem={({ item }: { item: PostImage }) => (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}
            enabled={post.images.length > 1}
            defaultIndex={currentImageIndex}
          />
          {post.images.length > 1 && (
            <>
              <Pressable
                style={[
                  styles.carouselButton, 
                  styles.prevButton,
                  currentImageIndex === 0 && styles.disabledButton
                ]}
                onPress={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                <AntDesign 
                  name="left" 
                  size={24} 
                  color={currentImageIndex === 0 ? 'rgba(255,255,255,0.3)' : '#fff'} 
                />
              </Pressable>
              <Pressable
                style={[
                  styles.carouselButton, 
                  styles.nextButton,
                  currentImageIndex === post.images.length - 1 && styles.disabledButton
                ]}
                onPress={handleNextImage}
                disabled={currentImageIndex === post.images.length - 1}
              >
                <AntDesign 
                  name="right" 
                  size={24} 
                  color={currentImageIndex === post.images.length - 1 ? 'rgba(255,255,255,0.3)' : '#fff'} 
                />
              </Pressable>
            </>
          )}
          {renderImageIndicators()}
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.stats}>
          <TouchableOpacity 
            style={styles.statItem} 
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={handleLikePress}
          >
            <AntDesign 
              name={isLiked ? "heart" : "hearto"} 
              size={24} 
              color={isLiked ? "#ff3b30" : "#666"} 
            />
            <Text style={[styles.statText, isLiked && styles.likedText]}>
              {post.likes_count}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statItem} 
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={handleCommentPress}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#666" />
            <Text style={styles.statText}>{post.comments_count}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timestamp}>
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: tr })}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    color: '#000',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
  disabledButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  stats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  likedText: {
    color: '#ff3b30',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
});

export default Post; 