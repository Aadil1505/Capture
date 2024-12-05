import { Text } from '@/components/ui/text';
import { useAuth } from '@/provider/AuthProvider';
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import "../../global.css";
import { getProfile } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import { Feather } from '@expo/vector-icons'; // For icons

const Profile = () => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { session, signOut } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (session?.user?.id) {
          const profileData = await getProfile(session.user.id);
          setUserProfile(profileData as Profile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [session?.user?.id]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      {/* <Text className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {userProfile?.name || 'User'}!
      </Text> */}
      <Card className="w-full max-w-md rounded-lg shadow-md">
        <CardHeader className="items-center">
          {/* Profile Picture */}
          <Image
            source={{ uri: userProfile?.profile_picture_url || 'https://via.placeholder.com/100' }}
            className="w-24 h-24 rounded-full border mb-3"
            resizeMode="cover"
          />
          {/* <Avatar alt="Zach Nugent's Avatar">
            <AvatarImage className='w-36' source={{ uri: userProfile?.profile_picture_url || 'https://via.placeholder.com/100' }} />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar> */}
          <CardTitle className="text-xl font-semibold text-secondary-foreground">
            {userProfile?.name}
          </CardTitle>
          <CardDescription className="text-sm text-secondary-foreground">
            {/* {userProfile?.username} */}
            Your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Text className="text-secondary-foreground text-md font-semibold mb-2">Username: {userProfile?.username}</Text>
          <Text className="text-secondary-foreground text-md font-semibold mb-2">Email: {userProfile?.email}</Text>
        </CardContent>
        <CardFooter className="mt-6">
          <Button
            onPress={signOut}
            variant={"destructive"}
            className="flex-row items-center justify-center w-full rounded-lg"
          >
            <Feather name="log-out" size={20} color="white" />
            <Text className="ml-2 text-white text-base">Sign Out</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
};

export default Profile;
