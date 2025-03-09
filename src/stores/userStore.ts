import { create } from 'zustand';

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'time' | 'achievement' | 'special';
  earned_at: string;
}

export interface TravelListing {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string;
  coverImage: string;
  bio: string;
  followers_count: number;
  following_count: number;
  points: number;
  badges: Badge[];
  hobbies: string[];
  languages: string[];
  created_at: string;
  updated_at: string;
  isFollowing?: boolean;
  travel_listings?: TravelListing[];
}

interface UserState {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchUserProfile: (userId: string) => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userProfile: null,
  loading: false,
  error: null,

  fetchUserProfile: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      // Burada gerçek API çağrısı yapılacak
      // Şimdilik mock veri kullanıyoruz
      const mockUserProfiles: Record<string, UserProfile> = {
        '1': {
          id: '1',
          name: 'Deniz Ayhan',
          username: '@denizayhan04',
          email: 'deniz@example.com',
          profileImage: 'https://picsum.photos/200',
          coverImage: 'https://picsum.photos/800/400',
          bio: 'React Native Developer 👨‍💻',
          followers_count: 120,
          following_count: 150,
          points: 750,
          badges: [
            {
              id: '1',
              name: '1 Yıllık Üye',
              description: 'Bir yıldır aramızda',
              image: 'https://picsum.photos/100',
              type: 'time',
              earned_at: '2024-03-21T10:00:00Z',
            },
            {
              id: '2',
              name: 'Gezgin',
              description: '10 seyahat gönderisi paylaştı',
              image: 'https://picsum.photos/101',
              type: 'achievement',
              earned_at: '2024-03-21T10:00:00Z',
            },
          ],
          hobbies: ['Coding', 'Photography', 'Travel'],
          languages: ['Turkish', 'English', 'German'],
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-03-21T10:00:00Z',
          travel_listings: [
            {
              id: '1',
              title: 'Kapadokya Gezisi',
              destination: 'Nevşehir, Türkiye',
              startDate: '2024-04-15',
              endDate: '2024-04-20',
              participants: 4,
              maxParticipants: 6,
              status: 'active',
            },
            {
              id: '2',
              title: 'Amsterdam Turu',
              destination: 'Amsterdam, Hollanda',
              startDate: '2024-05-01',
              endDate: '2024-05-07',
              participants: 3,
              maxParticipants: 5,
              status: 'active',
            },
          ],
        },
        '2': {
          id: '2',
          name: 'Ahmet Yılmaz',
          username: '@ahmetyilmaz',
          email: 'ahmet@example.com',
          profileImage: 'https://picsum.photos/201',
          coverImage: 'https://picsum.photos/800/401',
          bio: 'Travel enthusiast 🌍',
          followers_count: 250,
          following_count: 200,
          points: 1200,
          badges: [
            {
              id: '3',
              name: 'Süper Gezgin',
              description: '50 seyahat gönderisi paylaştı',
              image: 'https://picsum.photos/102',
              type: 'achievement',
              earned_at: '2024-03-21T11:00:00Z',
            },
            {
              id: '4',
              name: 'Sosyal Kelebek',
              description: '100 takipçiye ulaştı',
              image: 'https://picsum.photos/103',
              type: 'achievement',
              earned_at: '2024-03-21T11:00:00Z',
            },
          ],
          hobbies: ['Travel', 'Photography'],
          languages: ['Turkish', 'English'],
          created_at: '2024-01-02T00:00:00Z',
          updated_at: '2024-03-21T11:00:00Z',
          isFollowing: false,
          travel_listings: [
            {
              id: '3',
              title: 'İtalya Turu',
              destination: 'Roma, İtalya',
              startDate: '2024-06-01',
              endDate: '2024-06-10',
              participants: 2,
              maxParticipants: 4,
              status: 'active',
            },
            {
              id: '4',
              title: 'Barselona Gezisi',
              destination: 'Barselona, İspanya',
              startDate: '2024-04-01',
              endDate: '2024-04-05',
              participants: 3,
              maxParticipants: 3,
              status: 'completed',
            },
          ],
        },
        '3': {
          id: '3',
          name: 'Mehmet Kaya',
          username: '@mehmetkaya',
          email: 'mehmet@example.com',
          profileImage: 'https://picsum.photos/202',
          coverImage: 'https://picsum.photos/800/402',
          bio: 'Professional photographer 📸',
          followers_count: 1500,
          following_count: 800,
          points: 2500,
          badges: [
            {
              id: '5',
              name: 'Etkileşim Ustası',
              description: '1000 beğeniye ulaştı',
              image: 'https://picsum.photos/104',
              type: 'achievement',
              earned_at: '2024-03-21T12:00:00Z',
            },
            {
              id: '6',
              name: 'Verified',
              description: 'Doğrulanmış hesap',
              image: 'https://picsum.photos/105',
              type: 'special',
              earned_at: '2024-03-21T12:00:00Z',
            },
          ],
          hobbies: ['Photography', 'Art'],
          languages: ['Turkish', 'English', 'Spanish'],
          created_at: '2024-01-03T00:00:00Z',
          updated_at: '2024-03-21T12:00:00Z',
          isFollowing: true,
        },
      };

      // Kullanıcı ID'sine göre profil bilgisini al
      const userProfile = mockUserProfiles[userId];
      
      if (!userProfile) {
        throw new Error('User not found');
      }

      set({ userProfile, loading: false });
    } catch (error) {
      set({ error: 'User profile could not be fetched', loading: false });
    }
  },

  followUser: async (userId: string) => {
    try {
      // Burada gerçek API çağrısı yapılacak
      set((state) => ({
        userProfile: state.userProfile
          ? {
              ...state.userProfile,
              followers_count: state.userProfile.followers_count + 1,
              isFollowing: true,
            }
          : null,
      }));
    } catch (error) {
      set({ error: 'Could not follow user' });
    }
  },

  unfollowUser: async (userId: string) => {
    try {
      // Burada gerçek API çağrısı yapılacak
      set((state) => ({
        userProfile: state.userProfile
          ? {
              ...state.userProfile,
              followers_count: state.userProfile.followers_count - 1,
              isFollowing: false,
            }
          : null,
      }));
    } catch (error) {
      set({ error: 'Could not unfollow user' });
    }
  },
})); 