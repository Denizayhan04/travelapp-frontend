import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { usePostStore } from '../stores/postStore';

interface TaggedUser {
  id: string;
  name: string;
  username: string;
  profileImage: string;
}

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CreatePostComponentProps {
  communities: Community[];
  onCreatePost: (data: {
    content: string;
    images: string[];
    taggedUsers: TaggedUser[];
    communityId?: string;
  }) => void;
}

export const CreatePostComponent: React.FC<CreatePostComponentProps> = ({
  communities,
  onCreatePost,
}) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [taggedUsers, setTaggedUsers] = useState<TaggedUser[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagSearchText, setTagSearchText] = useState('');

  // Mock kullanıcı arama sonuçları
  const mockSearchResults: TaggedUser[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      username: '@ahmet',
      profileImage: 'https://picsum.photos/100',
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      username: '@ayse',
      profileImage: 'https://picsum.photos/101',
    },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleTagUser = (user: TaggedUser) => {
    if (!taggedUsers.find(u => u.id === user.id)) {
      setTaggedUsers([...taggedUsers, user]);
    }
    setShowTagInput(false);
    setTagSearchText('');
  };

  const handleRemoveTag = (userId: string) => {
    setTaggedUsers(taggedUsers.filter(user => user.id !== userId));
  };

  const handleSubmit = () => {
    onCreatePost({
      content,
      images,
      taggedUsers,
      communityId: selectedCommunity?.id,
    });

    // Reset form
    setContent('');
    setImages([]);
    setTaggedUsers([]);
    setSelectedCommunity(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ne düşünüyorsun?"
        multiline
        value={content}
        onChangeText={setContent}
      />

      {/* Tagged Users */}
      {taggedUsers.length > 0 && (
        <View style={styles.taggedUsersContainer}>
          {taggedUsers.map(user => (
            <View key={user.id} style={styles.taggedUser}>
              <Image source={{ uri: user.profileImage }} style={styles.taggedUserImage} />
              <Text style={styles.taggedUserName}>{user.name}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(user.id)}>
                <MaterialCommunityIcons name="close" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Image Preview */}
      {images.length > 0 && (
        <ScrollView horizontal style={styles.imagePreviewContainer}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imagePreview}>
              <Image source={{ uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => handleRemoveImage(index)}
              >
                <MaterialCommunityIcons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Tag Search */}
      {showTagInput && (
        <View style={styles.tagSearchContainer}>
          <TextInput
            style={styles.tagSearchInput}
            placeholder="Kullanıcı ara..."
            value={tagSearchText}
            onChangeText={setTagSearchText}
          />
          <FlatList
            data={mockSearchResults}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchResultItem}
                onPress={() => handleTagUser(item)}
              >
                <Image source={{ uri: item.profileImage }} style={styles.searchResultImage} />
                <View>
                  <Text style={styles.searchResultName}>{item.name}</Text>
                  <Text style={styles.searchResultUsername}>{item.username}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={pickImage} style={styles.actionButton}>
            <MaterialCommunityIcons name="image" size={24} color="#4A80F0" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowTagInput(!showTagInput)}
            style={styles.actionButton}
          >
            <MaterialCommunityIcons name="account-plus" size={24} color="#4A80F0" />
          </TouchableOpacity>
        </View>

        {/* Community Selection */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.communityList}>
          <TouchableOpacity
            style={[
              styles.communityItem,
              !selectedCommunity && styles.selectedCommunity,
            ]}
            onPress={() => setSelectedCommunity(null)}
          >
            <Text style={styles.communityName}>Profilim</Text>
          </TouchableOpacity>
          {communities.map(community => (
            <TouchableOpacity
              key={community.id}
              style={[
                styles.communityItem,
                selectedCommunity?.id === community.id && styles.selectedCommunity,
              ]}
              onPress={() => setSelectedCommunity(community)}
            >
              <Image source={{ uri: community.image }} style={styles.communityImage} />
              <Text style={styles.communityName}>{community.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.postButton, !content && styles.postButtonDisabled]}
          onPress={handleSubmit}
          disabled={!content}
        >
          <Text style={styles.postButtonText}>Paylaş</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  taggedUsersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  taggedUser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  taggedUserImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  taggedUserName: {
    fontSize: 14,
    marginRight: 4,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imagePreview: {
    marginRight: 8,
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  tagSearchContainer: {
    marginBottom: 12,
  },
  tagSearchInput: {
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  searchResultImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchResultUsername: {
    fontSize: 14,
    color: '#666',
  },
  actionContainer: {
    flexDirection: 'column',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  actionButton: {
    marginRight: 16,
  },
  communityList: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  communityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  selectedCommunity: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#4A80F0',
  },
  communityImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  communityName: {
    fontSize: 14,
    color: '#333',
  },
  postButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 