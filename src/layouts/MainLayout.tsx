import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';

interface MainLayoutProps {
  children: React.ReactNode;
  username?: string;
  onSearch?: (text: string) => void;
  onFilter?: () => void;
  onNotificationsPress?: () => void;
  onMessagesPress?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  username,
  onSearch,
  onFilter,
  onNotificationsPress,
  onMessagesPress,
}) => {
  const route = useRoute();
  const getHeaderVariant = () => {
    const routeName = route.name.toLowerCase();
    if (routeName.includes('home')) return 'home';
    if (routeName.includes('match')) return 'match';
    if (routeName.includes('search')) return 'search';
    if (routeName.includes('communities')) return 'communities';
    if (routeName.includes('profile')) return 'profile';
    return 'home';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        variant={getHeaderVariant()}
        username={username}
        onSearch={onSearch}
        onFilter={onFilter}
        onNotificationsPress={onNotificationsPress}
        onMessagesPress={onMessagesPress}
      />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default MainLayout; 