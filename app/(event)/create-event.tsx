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
import { createEvent, joinEvent } from '@/lib/actions';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  const handleCreateEvent = async () => {
    if (!eventName.trim()) {
      Alert.alert('Error', 'Please enter an event name');
      return;
    }
  
    try {
      setLoading(true);
      
      const event = await createEvent(eventName, session?.user.id as string);
  
      if (event) {
        // Auto join the creator to their event
        const joined = await joinEvent(event.event_code, session?.user.id as string);
  
        if (!joined) {
          Alert.alert('Error', 'Event created but failed to join. Please try joining manually.');
          return;
        }
  
        Alert.alert(
          'Event Created!',
          `Your event code is: ${event.event_code}\n\nShare this code with others to join your event.`,
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
              Create New Event
            </Text>
            <IconSymbol size={32} name="plus.circle.fill" color="white" />
          </View>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Event Name Input */}
          <View className="space-y-2 mb-2">
            <Label className="text-base text-secondary-foreground">
              Event Name
            </Label>
            <Input
              placeholder="Enter event name"
              value={eventName}
              onChangeText={setEventName}
              className="bg-card text-secondary-foreground"
            />
          </View>

          {/* Create Button */}
          <Button
            onPress={handleCreateEvent}
            disabled={loading}
            className="w-full py-4 mb-2"
          >
            <Text className="text-primary-foreground text-base font-semibold">
              {loading ? 'Creating...' : 'Create Event'}
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
          <Button
            onPress={() => router.push("/event-board")}
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
                    What happens next?
                </Text>
            </CardTitle>
            <CardContent>                
                <View className="space-y-2">
                    <Text className="text-muted-foreground">
                    • An event code will be generated
                    </Text>
                    <Text className="text-muted-foreground">
                    • Share this code with friends to join
                    </Text>
                    <Text className="text-muted-foreground">
                    • Start capturing memories together!
                    </Text>
                </View>
            </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}