import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getCurrentEvent } from '@/lib/actions';
import { useAuth } from '@/provider/AuthProvider';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import "../../global.css";

export default function Explore() {
  const [currentEvent, setCurrentEvent] = useState<EventDetails | null>(null);
  const { session } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const checkActiveEvent = async () => {
        try {
          const event = await getCurrentEvent(session?.user.id as string);
          if (event.event){
            setCurrentEvent(event);
          }
          else {
            console.log("no event found")
          }
        } catch (error) {
          console.error('Error checking active event:', error);
        }
      };

      checkActiveEvent();
    }, [session?.user.id])
  );
 return (
   <SafeAreaView className="flex-1 bg-background">
     <View className='flex-1 items-center justify-center p-4 space-y-4'>
       {/* Camera Launch Card */}
       {currentEvent ? (
        <Card className='w-full mb-4'>
         <CardHeader>
           <CardTitle className="text-center text-secondary-foreground">
             Camera
           </CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
           <Button
             onPress={() => router.push('/camera')}
             className="w-full flex-row"
           >
             <IconSymbol size={20} name="camera" color="black" />
             <Text className="text-primary-foreground ml-2">
               Launch Camera
             </Text>
           </Button>
         </CardContent>
       </Card>
       ): 
       <Card className='w-full mb-4'>
          <CardHeader>
            <CardTitle className="text-center text-secondary-foreground">
              Join an Event
            </CardTitle>
          </CardHeader>
          <CardDescription className='text-center mb-4'>
            <Text >Join an event to get access to the camera.</Text>
          </CardDescription>
          <CardContent className="space-y-4">
            <Button
              onPress={() => router.push('/join-event')}
              className="w-full flex-row"
            >
              <IconSymbol size={20} name="camera" color="black" />
              <Text className="text-primary-foreground ml-2">
                Join now
              </Text>
            </Button>
          </CardContent>
        </Card>
       }

       {/* Camera Info Card */}
       <Card className='w-full'>
         <CardHeader>
           <CardTitle className="text-secondary-foreground">
             Camera Features
           </CardTitle>
         </CardHeader>
         <CardContent>
           <View className="space-y-3">
             <View className="flex-row items-center space-x-2">
               <IconSymbol size={16} name="camera.fill" color="white" />
               <Text className="text-secondary-foreground">Photo Mode: Capture high-quality photos</Text>
             </View>

             <View className="flex-row items-center space-x-2">
               <IconSymbol size={16} name="video.fill" color="white" />
               <Text className="text-secondary-foreground">Video Mode: Record moments in motion</Text>
             </View>

             <View className="flex-row items-center space-x-2">
               <IconSymbol size={16} name="bolt.fill" color="white" />
               <Text className="text-secondary-foreground">Flash: Adjustable flash settings</Text>
             </View>

             <View className="flex-row items-center space-x-2">
               <IconSymbol size={16} name="arrow.triangle.2.circlepath.camera.fill" color="white" />
               <Text className="text-secondary-foreground">Switch between front and back cameras</Text>
             </View>

             <View className="flex-row items-center space-x-2">
               <IconSymbol size={16} name="qrcode" color="white" />
               <Text className="text-secondary-foreground">QR Code Scanner: Built-in scanning capability</Text>
             </View>
           </View>
         </CardContent>
       </Card>
     </View>
   </SafeAreaView>
 );
}