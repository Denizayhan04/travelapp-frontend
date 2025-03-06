import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';

interface MainLayoutProps {
  children: React.ReactNode;
  username?: string;
  onSearch?: (text: string) => void;
  onFilter?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  username,
  onSearch,
  onFilter,
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
    <View style={styles.container}>
      <Header
        variant={getHeaderVariant()}
        username={username}
        onSearch={onSearch}
        onFilter={onFilter}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default MainLayout; 