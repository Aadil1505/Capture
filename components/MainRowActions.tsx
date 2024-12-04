import * as React from "react";
import { SymbolView } from "expo-symbols";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";
import { CameraMode } from "expo-camera";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}

export default function MainRowActions({
  cameraMode,
  handleTakePicture,
  isRecording,
}: MainRowActionsProps) {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      album: fetchedAlbums.find((album) => album.title === "Recents"),
      mediaType: "photo",
      sortBy: "creationTime",
      first: 4,
    });
    setAssets(albumAssets.assets);
  }

  return (
    <View style={styles.container}>
      <View style={styles.galleryContainer}>
        <FlatList
          data={assets}
          inverted
          renderItem={({ item }) => (
            <Image
              key={item.id}
              source={item.uri}
              style={styles.thumbnail}
            />
          )}
          horizontal
          contentContainerStyle={styles.galleryContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity onPress={handleTakePicture}>
          <SymbolView
            name={
              cameraMode === "picture"
                ? "circle"
                : isRecording
                ? "record.circle"
                : "circle.circle"
            }
            size={90}
            type="hierarchical"
            tintColor={isRecording ? "red" : "white"}
            animationSpec={{
              effect: {
                type: isRecording ? "pulse" : "bounce",
              },
              repeating: isRecording,
            }}
            fallback={
              <TouchableOpacity
                onPress={handleTakePicture}
                style={styles.fallbackButton}
              >
                <Text>{cameraMode === "picture" ? "📷" : "🎥"}</Text>
              </TouchableOpacity>
            }
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    position: "absolute",
    bottom: 45,
    paddingHorizontal: 20,
  },
  galleryContainer: {
    flex: 1,
    maxWidth: "30%",
  },
  galleryContent: {
    gap: 6,
  },
  thumbnail: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  captureButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
    maxWidth: "30%",
  },
  fallbackButton: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});