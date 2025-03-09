import { create } from 'zustand';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  images: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    username: string;
    profileImage: string;
  };
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (data: {
    content: string;
    images: string[];
    taggedUsers: { id: string; name: string; username: string; profileImage: string; }[];
    communityId?: string;
  }) => Promise<void>;
  addPost: (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      // Burada gerçek API çağrısı yapılacak
      const mockPosts: Post[] = [
        {
          id: '1',
          user_id: '1',
          content: 'Bugün harika bir gün! #seyahat #gezgin',
          images: ['https://picsum.photos/400/300'],
          likes_count: 42,
          comments_count: 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: {
            id: '1',
            name: 'John Doe',
            username: 'johndoe',
            profileImage: 'https://picsum.photos/200',
          },
        },
        {
          id: '2',
          user_id: '2',
          content: 'Yeni rotalar, yeni maceralar! 🌍✈️',
          images: ['https://picsum.photos/400/301'],
          likes_count: 28,
          comments_count: 3,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString(),
          user: {
            id: '2',
            name: 'Jane Smith',
            username: 'janesmith',
            profileImage: 'https://picsum.photos/201',
          },
        },
      ];

      set({ posts: mockPosts, loading: false });
    } catch (error) {
      set({ error: 'Posts could not be fetched', loading: false });
    }
  },

  createPost: async (data) => {
    set({ loading: true, error: null });
    try {
      // TODO: API'ye post gönder
      // Şimdilik mock data oluşturuyoruz
      const newPost: Post = {
        id: Date.now().toString(),
        user_id: '1', // Giriş yapmış kullanıcının ID'si
        content: data.content,
        images: data.images,
        likes_count: 0,
        comments_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
          id: '1',
          name: 'Deniz Ayhan',
          username: 'denizayhan04',
          profileImage: 'https://picsum.photos/200',
        },
      };

      set(state => ({
        posts: [newPost, ...state.posts],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Post oluşturulurken bir hata oluştu', loading: false });
    }
  },

  addPost: async (post) => {
    set({ loading: true, error: null });
    try {
      // Burada gerçek API çağrısı yapılacak
      const now = new Date().toISOString();
      const newPost: Post = {
        id: Date.now().toString(),
        ...post,
        created_at: now,
        updated_at: now,
      };

      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Post could not be added', loading: false });
    }
  },

  likePost: async (postId) => {
    try {
      // Burada gerçek API çağrısı yapılacak
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        ),
      }));
    } catch (error) {
      set({ error: 'Could not like post' });
    }
  },

  unlikePost: async (postId) => {
    try {
      // Burada gerçek API çağrısı yapılacak
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count - 1 }
            : post
        ),
      }));
    } catch (error) {
      set({ error: 'Could not unlike post' });
    }
  },
})); 