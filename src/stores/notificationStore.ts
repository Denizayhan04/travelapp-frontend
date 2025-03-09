import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  image: string;
}

interface Notification {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'community';
  user: User;
  postImage?: string;
  comment?: string;
  communityName?: string;
  time: string;
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      // Burada gerçek API çağrısı yapılacak
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'follow',
          user: {
            id: '2',
            name: 'Ahmet Yılmaz',
            image: 'https://picsum.photos/200',
          },
          time: '2 saat önce',
          isRead: false,
        },
        {
          id: '2',
          type: 'like',
          user: {
            id: '3',
            name: 'Mehmet Kaya',
            image: 'https://picsum.photos/201',
          },
          postImage: 'https://picsum.photos/400',
          time: '3 saat önce',
          isRead: false,
        },
        {
          id: '3',
          type: 'comment',
          user: {
            id: '4',
            name: 'Ayşe Demir',
            image: 'https://picsum.photos/202',
          },
          comment: 'Harika bir yer! Bende gitmek istiyorum 😊',
          time: '5 saat önce',
          isRead: true,
        },
      ];

      const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

      set({
        notifications: mockNotifications,
        unreadCount,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Notifications could not be fetched', loading: false });
    }
  },

  markAsRead: async (notificationId: string) => {
    try {
      // Burada gerçek API çağrısı yapılacak
      set((state) => {
        const notifications = state.notifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        );
        return {
          notifications,
          unreadCount: notifications.filter((n) => !n.isRead).length,
        };
      });
    } catch (error) {
      set({ error: 'Could not mark notification as read' });
    }
  },

  markAllAsRead: async () => {
    try {
      // Burada gerçek API çağrısı yapılacak
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      set({ error: 'Could not mark all notifications as read' });
    }
  },
})); 