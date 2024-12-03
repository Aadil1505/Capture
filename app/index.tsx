import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";

const Onboarding = () => {
  return (
<SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center px-4">

          <View className="flex-row items-center mb-10">
            <Text className="text-primary-foreground text-7xl font-bold mr-2">
              Capture
            </Text>
            <IconSymbol size={60} name="camera.fill" color="black" />
          </View>
          <Image
            source={{
                uri: "https://images.unsplash.com/photo-1695290513904-167cb936e562?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className='w-4/5 h-52 border rounded-lg mb-2'
            resizeMode="cover"
          />
        <View className="mt-5">
            <Text className="text-3xl text-primary-foreground font-bold text-center">
                Rediscover Endless{"\n"}
                Memories With Us
                <Text className="text-3xl text-secondary-foreground font-bold text-center"></Text>
            </Text>

        </View>
            <Button className='w-1/3 mt-7' variant={"secondary"} onPress={() => router.push("/sign-in")}>
                <Text>Lets Go</Text>
            </Button>

        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="dark" />

    </SafeAreaView>    
    
  );
};

export default Onboarding;
