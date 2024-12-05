import { View, ScrollView, Alert, TouchableOpacity, Image, useWindowDimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/provider/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from '@/components/Loading';
import { getUserPhotos } from '@/lib/actions';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

interface Photo {
  id: number;
  photo_url: string;
  event_id: number;
  uploaded_at: string;
}

interface PhotoComponentProps {
  photo: Photo;
  isGridView: boolean;
  photoSize: number;
  spacing: number;
}

const PhotoComponent = ({ photo, isGridView, photoSize, spacing }: PhotoComponentProps) => {
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    try {
      setSharing(true);
      const { uri } = await FileSystem.downloadAsync(
        photo.photo_url,
        FileSystem.cacheDirectory + 'temp.jpg'
      );

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share photo');
    } finally {
      setSharing(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to save photos');
        return;
      }

      const { uri } = await FileSystem.downloadAsync(
        photo.photo_url,
        FileSystem.cacheDirectory + 'temp.jpg'
      );

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Success', 'Photo saved to your library');

    } catch (error) {
      console.error('Error saving:', error);
      Alert.alert('Error', 'Failed to save photo');
    } finally {
      setSaving(false);
    }
  };

  if (isGridView) {
    return (
      <TouchableOpacity
        className={`m-${spacing/2}`}
        style={{ width: photoSize }}
      >
        <Image
          source={{ uri: photo.photo_url }}
          className="w-full aspect-square rounded-md"
          style={{ height: photoSize }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Card className="bg-card mb-4">
      <CardContent className="p-0">
        <Image
          source={{ uri: photo.photo_url }}
          className="w-full h-64 rounded-t-lg"
        />
        <View className="p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-muted-foreground text-sm">
                {new Date(photo.uploaded_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>
            <View className="flex-row gap-4">
              <TouchableOpacity 
                onPress={handleSave}
                disabled={saving}
              >
                <IconSymbol 
                  size={20} 
                  name="square.and.arrow.down" 
                  color={saving ? "gray" : "white"}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleShare}
                disabled={sharing}
              >
                <IconSymbol 
                  size={20} 
                  name="square.and.arrow.up" 
                  color={sharing ? "gray" : "white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};

export default function UserGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { session } = useAuth();
  const { width } = useWindowDimensions();

  const numColumns = 3;
  const spacing = 2;
  const photoSize = (width - 32 - (spacing * (numColumns - 1))) / numColumns;

  const loadPhotos = async () => {
    try {
      
      const { data, error } = await getUserPhotos(session?.user.id as string);
      if (error) throw error;
      if (data) {
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error loading photos:', error);
      Alert.alert('Error', 'Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPhotos();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadPhotos();
  }, []);

  if (loading) return <Loading />;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-2 border-b border-border">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-bold text-secondary-foreground">
              My Gallery
            </Text>
            <Text className="text-sm text-muted-foreground">
              All your captured memories
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsGridView(!isGridView)}
            className="p-2"
          >
            <IconSymbol 
              size={24} 
              name={isGridView ? "square.grid.3x3" : "list.bullet"} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {photos.length === 0 ? (
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-center text-secondary-foreground">
                No Photos Yet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-center text-muted-foreground">
                Photos you contribute to events will appear here!
              </Text>
              <Button
                onPress={() => router.replace('/join-event')}
                className="mt-4 mx-auto"
              >
                <Text className="text-primary-foreground">Join an event!</Text>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <View className={isGridView ? "flex-row flex-wrap" : "space-y-4"}>
            {photos.map((photo) => (
              <PhotoComponent 
                key={photo.id} 
                photo={photo}
                isGridView={isGridView}
                photoSize={photoSize}
                spacing={spacing}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}