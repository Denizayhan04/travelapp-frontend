import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';
import { CreatePostComponent } from '../components/CreatePostComponent';
import { usePostStore } from '../stores/postStore';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock communities for testing
const mockCommunities = [
  {
    id: '1',
    name: 'Gezginler',
    description: 'Seyahat severler topluluğu',
    image: 'https://picsum.photos/200',
  },
  {
    id: '2',
    name: 'Fotoğrafçılar',
    description: 'Fotoğraf tutkunları',
    image: 'https://picsum.photos/201',
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { posts, loading, error, fetchPosts, createPost } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications');
  };

  const handleMessagesPress = () => {
    navigation.navigate('Messages');
  };

  const handleCreatePost = async (data: {
    content: string;
    images: File[];
    taggedUsers: { id: string; name: string; username: string; profileImage: string; }[];
    communityId?: string;
  }) => {
    await createPost(data);
  };

  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetail', { postId });
  };

  return (
    <MainLayout
      onNotificationsPress={handleNotificationsPress}
      onMessagesPress={handleMessagesPress}
    >
      <ScrollView style={styles.container}>
        <CreatePostComponent
          communities={mockCommunities}
          onCreatePost={handleCreatePost}
        />
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#4A80F0" />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : posts.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>Henüz gönderi yok</Text>
          </View>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} onPress={handlePostPress} />
          ))
        )}
      </ScrollView>
    </MainLayout>
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
    padding: 20,
    minHeight: 200,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen; 