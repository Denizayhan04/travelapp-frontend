import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';

interface MainLayoutProps {
  children: React.ReactNode;
  username?: string;
  onSearch?: (text: string) => void;
  onFilter?: () => void;
  onNotificationsPress?: () => void;
  onMessagesPress?: () => void;
  style?: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  username,
  onSearch,
  onFilter,
  onNotificationsPress,
  onMessagesPress,
  style,
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
    <View style={[styles.container, style]}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
});

export default MainLayout; 