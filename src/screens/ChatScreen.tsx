import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
}

// Mock veri
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Merhaba, yarın geziye katılacak mısın?',
    senderId: '2', // Diğer kullanıcı
    timestamp: '10:30',
  },
  {
    id: '2',
    text: 'Evet, katılmayı düşünüyorum. Saat kaçta buluşuyoruz?',
    senderId: '1', // Mevcut kullanıcı
    timestamp: '10:31',
  },
  {
    id: '3',
    text: 'Sabah 9\'da merkez meydanda buluşalım.',
    senderId: '2',
    timestamp: '10:32',
  },
  {
    id: '4',
    text: 'Harika, orada görüşürüz!',
    senderId: '1',
    timestamp: '10:33',
  },
];

const CURRENT_USER_ID = '1'; // Mevcut kullanıcının ID'si

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        senderId: CURRENT_USER_ID,
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };

      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isSentByMe = item.senderId === CURRENT_USER_ID;

    return (
      <View
        style={[
          styles.messageContainer,
          isSentByMe ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={[
          styles.messageText,
          isSentByMe ? styles.sentMessageText : styles.receivedMessageText,
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesaj yaz..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <MaterialCommunityIcons
            name="send"
            size={24}
            color={newMessage.trim() ? '#4A80F0' : '#536471'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 20,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A80F0',
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  sentMessageText: {
    color: '#fff',
  },
  receivedMessageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFF3F4',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
});

export default ChatScreen; 