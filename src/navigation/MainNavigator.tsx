import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import MatchScreen from '../screens/MatchScreen';
import SearchScreen from '../screens/SearchScreen';
import CommunitiesScreen from '../screens/CommunitiesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom tab bar icon component
const TabBarIcon: React.FC<{
  focused: boolean;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  isProfile?: boolean;
  profileImage?: string;
}> = ({ focused, icon, isProfile, profileImage }) => {
  return (
    <View style={styles.iconContainer}>
      {isProfile ? (
        <View style={[styles.profileIcon, focused && styles.focusedIcon]}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <MaterialCommunityIcons
              name="account"
              size={32}
              color={focused ? '#4A80F0' : '#536471'}
            />
          )}
        </View>
      ) : (
        <MaterialCommunityIcons
          name={icon}
          size={32}
          color={focused ? '#4A80F0' : '#536471'}
        />
      )}
    </View>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon="home"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Match" 
        component={MatchScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon="swap-horizontal"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon="magnify"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Communities" 
        component={CommunitiesScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon="account-group"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon="account"
              isProfile
              // Profil fotoğrafını buraya ekleyebilirsiniz
              // profileImage="https://example.com/profile.jpg"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  focusedIcon: {
    backgroundColor: '#4A80F0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});

export default MainNavigator; 