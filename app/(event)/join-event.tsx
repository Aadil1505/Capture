import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/provider/AuthProvider';
import { joinEvent } from '@/lib/actions';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default function JoinEvent() {
  const [eventCode, setEventCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  const handleJoinEvent = async () => {
    if (!eventCode.trim()) {
      Alert.alert('Error', 'Please enter an event code');
      return;
    }

    try {
      setLoading(true);
      
      const joined = await joinEvent(eventCode.toUpperCase(), session?.user.id as string);

      if (joined) {
        Alert.alert(
          'Success!',
          'You have joined the event.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/event-board')
            }
          ]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        className="flex-1" 
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mb-8">
          <View className="flex-row items-center">
            <Text className="text-secondary-foreground text-3xl font-bold mr-2">
              Join Event
            </Text>
            <IconSymbol size={32} name="person.2.fill" color="white" />
          </View>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Event Code Input */}
          <View className="space-y-2 mb-2">
            <Label className="text-base text-secondary-foreground">
              Event Code
            </Label>
            <Input
              placeholder="Enter event code"
              value={eventCode}
              onChangeText={setEventCode}
              className="bg-card text-secondary-foreground"
              autoCapitalize="characters"
              maxLength={6}
            />
          </View>

          {/* Join Button */}
          <Button
            onPress={handleJoinEvent}
            disabled={loading}
            className="w-full py-4 mb-2"
          >
            <Text className="text-primary-foreground text-base font-semibold">
              {loading ? 'Joining...' : 'Join Event'}
            </Text>
          </Button>

          {/* Cancel Button */}
          <Button
            onPress={() => router.back()}
            variant="destructive"
            className="w-full"
          >
            <Text className="text-secondary-foreground text-base">
              Cancel
            </Text>
          </Button>
        </View>

        {/* Information Section */}
        <Card className="mt-8 p-4 bg-card rounded-lg">
            <CardTitle>
                <Text className="text-secondary-foreground text-base font-semibold mb-2">
                    How to join an event?
                </Text>
            </CardTitle>
            <CardContent>                
                <View className="space-y-2">
                    <Text className="text-muted-foreground">
                    • Ask the event creator for the event code
                    </Text>
                    <Text className="text-muted-foreground">
                    • Enter the 6-character code above
                    </Text>
                    <Text className="text-muted-foreground">
                    • Start capturing and sharing memories!
                    </Text>
                </View>
            </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}