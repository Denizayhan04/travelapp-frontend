import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MainLayout from '../layouts/MainLayout';
import Post from '../components/Post';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

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
    <MainLayout
      onNotificationsPress={() => navigation.navigate('Notifications')}
      onMessagesPress={() => navigation.navigate('Messages')}
    >
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