import { create } from 'zustand';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  images: {
    id: string;
    image_url: string;
    order: number;
  }[];
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
    images: File[];
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
      // TODO: API'den postları çek
      // Şimdilik mock data kullanıyoruz
      const mockPosts: Post[] = [
        {
          id: '1',
          user_id: '1',
          content: 'Harika bir gün! 🌞',
          images: [
            {
              id: '1',
              image_url: 'https://picsum.photos/800/800',
              order: 0
            },
            {
              id: '2',
              image_url: 'https://picsum.photos/800/801',
              order: 1
            },
            {
              id: '3',
              image_url: 'https://picsum.photos/800/802',
              order: 2
            }
          ],
          likes_count: 42,
          comments_count: 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: {
            id: '1',
            name: 'Deniz Ayhan',
            username: 'denizayhan04',
            profileImage: 'https://picsum.photos/200',
          },
        },
        {
          id: '2',
          user_id: '2',
          content: 'Yeni kameramla çektiğim ilk fotoğraflar 📸',
          images: [
            {
              id: '4',
              image_url: 'https://picsum.photos/800/803',
              order: 0
            },
            {
              id: '5',
              image_url: 'https://picsum.photos/800/804',
              order: 1
            }
          ],
          likes_count: 28,
          comments_count: 3,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString(),
          user: {
            id: '2',
            name: 'Ahmet Yılmaz',
            username: 'ahmetyilmaz',
            profileImage: 'https://picsum.photos/201',
          },
        },
      ];

      set({ posts: mockPosts, loading: false });
    } catch (error) {
      set({ error: 'Postlar yüklenirken bir hata oluştu', loading: false });
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
        images: data.images.map((_, index) => ({
          id: `${Date.now()}-${index}`,
          image_url: URL.createObjectURL(data.images[index]),
          order: index
        })),
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
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        ),
      }));
    } catch (error) {
      set({ error: 'Beğeni işlemi başarısız oldu' });
    }
  },

  unlikePost: async (postId) => {
    try {
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count - 1 }
            : post
        ),
      }));
    } catch (error) {
      set({ error: 'Beğeni kaldırma işlemi başarısız oldu' });
    }
  },
})); 