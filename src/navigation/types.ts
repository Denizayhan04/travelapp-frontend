export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Match: undefined;
  Search: undefined;
  Communities: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Match: undefined;
  Search: undefined;
  Communities: undefined;
  Profile: undefined;
  UserProfile: { userId: string };
  CommunityDetail: { communityId: string };
  PostDetail: { postId: string; focusComment?: boolean };
  Notifications: undefined;
  Messages: undefined;
  Chat: { userId: string; username: string };
}; 