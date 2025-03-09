import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  coverImage?: string;
  bio?: string;
  followers: number;
  following: number;
  hobbies?: string[];
  languages?: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      // Burada gerçek API çağrısı yapılacak
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        username: username,
        profileImage: 'https://picsum.photos/200',
        bio: 'Gezmeyi ve yeni yerler keşfetmeyi seven bir gezgin. Fotoğraf çekmeye bayılırım ve her anı ölümsüzleştirmeye çalışırım. ✈️ 📸',
        followers: 1234,
        following: 891,
        hobbies: ['Fotoğrafçılık', 'Seyahat', 'Yüzme', 'Kitap Okuma'],
        languages: ['Türkçe', 'İngilizce', 'İspanyolca'],
      };

      set({ user: mockUser, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ error: 'Login failed', loading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },
})); 