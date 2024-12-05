import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { router, useFocusEffect } from 'expo-router';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { getCurrentEvent } from '@/lib/actions';
import { useAuth } from '@/provider/AuthProvider';
import { useCallback, useState } from 'react';

interface EventDetails {
 event: {
   id: number;
   name: string;
   event_code: string;
 };
}

const Home = () => {
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
     <ScrollView 
       className="flex-1" 
       contentContainerClassName="px-4 py-6"
       showsVerticalScrollIndicator={false}
     >
       {/* Header */}
       <View className="items-center mb-10">
         <View className="flex-row items-center">
           <Text className="text-secondary-foreground text-5xl font-bold mr-2">
             Capture
           </Text>
           <IconSymbol size={48} name="camera.fill" color="white" />
         </View>
       </View>

       {/* Cards Container */}
       <View className="space-y-6">
         {/* Current Event Card - Show only if user is in an event */}
         {currentEvent && (
           <TouchableOpacity 
             onPress={() => router.push('/event-board')}
             className="shadow-sm mb-14"
             activeOpacity={0.7}
           >
             <Card className="bg-card">
               <CardHeader className="pb-2">
                 <View className="flex-row items-center justify-between mb-2">
                   <CardTitle className="text-2xl font-bold text-secondary-foreground">Current Event</CardTitle>
                   <IconSymbol size={32} name="camera.viewfinder" color="white" />
                 </View>
                 <CardDescription className="text-base text-muted-foreground">
                   {currentEvent.event.name}
                 </CardDescription>
                 <Text className="text-sm text-muted-foreground">
                   Code: {currentEvent.event.event_code}
                 </Text>
               </CardHeader>
               <View className="w-full h-40 overflow-hidden">
                 <Image 
                   source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3' }}
                   className="w-full h-full"
                   resizeMode="cover"
                 />
               </View>
             </Card>
           </TouchableOpacity>
         )}

         {/* Create Event Card */}
         {!currentEvent && (<TouchableOpacity 
           onPress={() => router.push('/create-event')}
           className="shadow-sm mb-14"
           activeOpacity={0.7}
         >
           <Card className="bg-card">
             <CardHeader className="pb-2">
               <View className="flex-row items-center justify-between mb-2">
                 <CardTitle className="text-2xl font-bold text-secondary-foreground">Create Event</CardTitle>
                 <IconSymbol size={32} name="plus.circle.fill" color="white" />
               </View>
               <CardDescription className="text-base text-muted-foreground" aria-hidden>
                 Create a new photo sharing event and invite others
               </CardDescription>
             </CardHeader>
             <View className="w-full h-40 overflow-hidden">
               <Image 
                 source={{ uri: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                 className="w-full h-full"
                 resizeMode="cover"
               />
             </View>
           </Card>
         </TouchableOpacity>)}

         {/* Join Event Card */}
         {!currentEvent && (<TouchableOpacity 
           onPress={() => router.push('/join-event')}
           className="shadow-sm mb-14"
           activeOpacity={0.7}
         >
           <Card className="bg-card">
             <CardHeader className="pb-2">
               <View className="flex-row items-center justify-between mb-2">
                 <CardTitle className="text-2xl font-bold text-secondary-foreground">Join Event</CardTitle>
                 <IconSymbol size={32} name="person.2.fill" color="white" />
               </View>
               <CardDescription className="text-base text-muted-foreground">
                 Join an existing photo sharing event
               </CardDescription>
             </CardHeader>
             <View className="w-full h-40 overflow-hidden">
               <Image 
                 source={{ uri: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                 className="w-full h-full"
                 resizeMode="cover"
               />
             </View>
           </Card>
         </TouchableOpacity>)}

         {/* View Gallery Card */}
         <TouchableOpacity 
           onPress={() => router.push('/gallery')}
           className="shadow-sm mb-14"
           activeOpacity={0.7}
         >
           <Card className="bg-card">
             <CardHeader className="pb-2">
               <View className="flex-row items-center justify-between mb-2">
                 <CardTitle className="text-2xl font-bold text-secondary-foreground">My Gallery</CardTitle>
                 <IconSymbol size={32} name="photo.fill" color="white" />
               </View>
               <CardDescription className="text-base text-muted-foreground">
                 View all your shared photos
               </CardDescription>
             </CardHeader>
             <View className="w-full h-40 overflow-hidden">
               <Image 
                 source={{ uri: 'https://images.unsplash.com/photo-1510682657356-6ee07db8204b?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                 className="w-full h-full"
                 resizeMode="cover"
               />
             </View>
           </Card>
         </TouchableOpacity>
       </View>
     </ScrollView>
   </SafeAreaView>
 );
};

export default Home;