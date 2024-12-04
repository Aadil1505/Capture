import React from 'react'
import { View,  } from 'react-native'
import "../../global.css"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export default function explore() {
  return (
    <View className='flex-1 items-center justify-center '>
      <Text className='text-3xl font-bold'>Open ur app bruh</Text>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Card Content</Text>
        </CardContent>
        <CardFooter>
          <Text>Card Footer</Text>
          <Button onPress={() => router.push("/camera")}>
            <Text>Go to camera</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  )
}


import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

// function Example() {
//   return (
//      <Avatar alt="Zach Nugent's Avatar">
//         <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
//         <AvatarFallback>
//           <Text>ZN</Text>
//         </AvatarFallback>
//       </Avatar>
//   );
// }