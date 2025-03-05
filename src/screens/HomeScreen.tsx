import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';

const HomeScreen: React.FC = () => {
  // Test verisi
  const posts = [
    {
      username: 'ahmetyilmaz',
      userImage: 'https://picsum.photos/200',
      postImage: 'https://picsum.photos/400/300',
      caption: 'Bugün yeni projeme başladım! React Native ile harika bir uygulama geliştiriyorum. #reactnative #mobile #development',
      likes: 42,
      timestamp: '2 saat önce',
      taggedUsers: [
        { username: 'mehmetkaya' },
        { username: 'aysedemir' }
      ],
    },
    {
      username: 'mehmetkaya',
      userImage: 'https://picsum.photos/201',
      postImage: 'https://picsum.photos/400/301',
      caption: 'Harika bir gün! 🌞',
      likes: 28,
      timestamp: '1 saat önce',
      taggedUsers: [
        { username: 'ahmetyilmaz' }
      ],
    }
  ];

  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        {posts.map((post, index) => (
          <Post
            key={index}
            username={post.username}
            userImage={post.userImage}
            postImage={post.postImage}
            caption={post.caption}
            likes={post.likes}
            timestamp={post.timestamp}
            taggedUsers={post.taggedUsers}
          />
        ))}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default HomeScreen; 