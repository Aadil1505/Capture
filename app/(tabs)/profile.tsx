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
import { Text } from '@/components/ui/text'; 

const Profile = () => {
  const userStats = {
    followers: 1234,
    following: 567,
    posts: 89,
  };

  const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

  const userInfo = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Software Developer | React Native Enthusiast',
    location: 'San Francisco, CA',
  };

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
        </CardFooter>
      </Card>
    </View>
  );
};

export default Profile;
