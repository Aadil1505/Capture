import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { getCurrentEvent } from '@/lib/actions';
import { useAuth } from '@/provider/AuthProvider';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const checkActiveEvent = async () => {
      try {
        const currentEvent = await getCurrentEvent(session?.user.id as string);
        if (currentEvent) {
          router.replace('/event-board');
        }
      } catch (error) {
        console.error('Error checking active event:', error);
      } finally {
        setLoading(false);
      }
    };

    checkActiveEvent();
  }, [session?.user.id]);

  if (loading) return <Loading />;

  // Rest of your component remains the same
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

        {/* Rest of your cards and content remains exactly the same... */}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;