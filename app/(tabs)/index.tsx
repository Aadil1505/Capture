import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

const Home = () => {
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
         {/* Create Event Card */}
         <TouchableOpacity 
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
             {/* <CardContent className="py-4">
               <Text className="text-base text-secondary-foreground">
                 Start a new event for collecting memories together
               </Text>
             </CardContent> */}
           </Card>
         </TouchableOpacity>

         {/* Join Event Card */}
         <TouchableOpacity 
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
             {/* <CardContent className="py-4">
               <Text className="text-base text-secondary-foreground">
                 Enter an event code to join and share photos
               </Text>
             </CardContent> */}
           </Card>
         </TouchableOpacity>

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
             {/* <CardContent className="py-4">
               <Text className="text-base text-secondary-foreground">
                 Access your complete photo collection
               </Text>
             </CardContent> */}
           </Card>
         </TouchableOpacity>
       </View>
     </ScrollView>
   </SafeAreaView>
 );
};

export default Home;