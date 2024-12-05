import { Image } from "expo-image";
import { Alert, View, ActivityIndicator } from "react-native";
import IconButton from "./IconButton";
import { shareAsync } from "expo-sharing";
import { saveToLibraryAsync } from "expo-media-library";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { uploadImageToSupabase } from "@/lib/actions";
import { useAuth } from "@/provider/AuthProvider";
import { useState } from "react";

interface PictureViewProps {
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
}

export default function PictureView({ picture, setPicture }: PictureViewProps) {
  const { session } = useAuth();
  const userId = session?.user.id;
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      await uploadImageToSupabase(picture, userId as string);
      Alert.alert("Picture uploaded successfully");
    } catch (error) {
      Alert.alert("Error uploading picture");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View
        style={{
          position: "absolute",
          right: 10,
          zIndex: 1,
          paddingTop: 50,
          gap: 16,
        }}
      >
        <IconButton
          onPress={async () => {
            saveToLibraryAsync(picture);
            Alert.alert("Saved picture successfully");
          }}
          iosName={"arrow.down"}
          androidName="close"
        />
        <IconButton
          onPress={async () => await shareAsync(picture)}
          iosName={"square.and.arrow.up"}
          androidName="close"
        />
        <View>
          {isUploading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <IconButton
              onPress={handleUpload}
              iosName={"paperplane"}
              androidName="close"
            />
          )}
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 50,
          left: 6,
        }}
      >
        <IconButton
          onPress={() => setPicture("")}
          iosName={"xmark"}
          androidName="close"
        />
      </View>
      <Image
        source={picture}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 5,
        }}
      />
    </Animated.View>
  );
}