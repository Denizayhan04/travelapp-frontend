import { create } from 'zustand';

export interface Message {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  lastMessage: string;
  time: string;
  unreadCount: number;
}

interface MessageState {
  messages: Message[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
  sendMessage: (userId: string, content: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      // Burada gerçek API çağrısı yapılacak
      const mockMessages: Message[] = [
        {
          id: '1',
          user: {
            id: '1',
            name: 'Ahmet Yılmaz',
            image: 'https://picsum.photos/200',
          },
          lastMessage: 'Merhaba, yarın geziye katılacak mısın?',
          time: '10:30',
          unreadCount: 2,
        },
        {
          id: '2',
          user: {
            id: '2',
            name: 'Mehmet Kaya',
            image: 'https://picsum.photos/201',
          },
          lastMessage: 'Fotoğrafları paylaşır mısın?',
          time: 'Dün',
          unreadCount: 0,
        },
        {
          id: '3',
          user: {
            id: '3',
            name: 'Ayşe Demir',
            image: 'https://picsum.photos/202',
          },
          lastMessage: 'Teşekkürler! 😊',
          time: 'Dün',
          unreadCount: 0,
        },
      ];

      const totalUnreadCount = mockMessages.reduce(
        (sum, message) => sum + message.unreadCount,
        0
      );

      set({
        messages: mockMessages,
        unreadCount: totalUnreadCount,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Messages could not be fetched', loading: false });
    }
  },

  markAsRead: async (messageId: string) => {
    try {
      // Burada gerçek API çağrısı yapılacak
      set((state) => {
        const messages = state.messages.map((m) =>
          m.id === messageId ? { ...m, unreadCount: 0 } : m
        );
        const totalUnreadCount = messages.reduce(
          (sum, message) => sum + message.unreadCount,
          0
        );
        return { messages, unreadCount: totalUnreadCount };
      });
    } catch (error) {
      set({ error: 'Could not mark message as read' });
    }
  },

  sendMessage: async (userId: string, content: string) => {
    try {
      // Burada gerçek API çağrısı yapılacak
      set((state) => {
        const messages = state.messages.map((m) =>
          m.user.id === userId
            ? {
                ...m,
                lastMessage: content,
                time: 'Şimdi',
              }
            : m
        );
        return { messages };
      });
    } catch (error) {
      set({ error: 'Could not send message' });
    }
  },
})); 