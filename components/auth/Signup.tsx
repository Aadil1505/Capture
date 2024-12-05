import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { supabase } from '@/lib/supabase'
import { Text } from "../ui/text"
import { Button } from '../ui/button'
import { IconSymbol } from '../ui/IconSymbol'
import "~/global.css"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    try {
      setLoading(true)

      // Basic validation
      if (!username.trim()) {
        Alert.alert('Error', 'Username is required')
        return
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (session?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            email: session.user.email,
            name: firstName,
            username: username.toLowerCase(), // Store username in lowercase for consistency
            updated_at: new Date().toISOString()
          })

        if (profileError) {
          console.error('Profile creation failed:', profileError)
          Alert.alert('Error creating profile', 'Username might already be taken')
          return
        }
      }

      Alert.alert('Success!')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="mt-10 p-3">
    {/* TITLE */}
    <View className="flex-1 items-center justify-center px-4">
      <View className="flex-row items-center">
        <Text className="text-secondary-foreground text-7xl font-bold mr-2">
          Capture
        </Text>
        <IconSymbol size={60} name="camera.fill" color="white" />
      </View>
     </View>

      <View className="mt-5 space-y-4">
        {/* First Name */}
        <View className='mb-2'>
            <View className='flex-row gap-2'>
                <IconSymbol 
                size={20} 
                name="person" 
                color="gray" 
                />
                <Label className='text-secondary-foreground' nativeID='name'>First Name</Label>
            </View>
            <Input
                className='bg-primary text-primary-foreground'
                placeholder="Batman"
                onChangeText={setFirstName}
                value={firstName}
                aria-labelledby='inputLabel'
                aria-errormessage='inputError'
            />
        </View>

        {/* Username */}
        <View className='mb-2'>
          <View className='flex-row gap-2'>
            <IconSymbol 
              size={20} 
              name="at" 
              color="gray" 
            />
            <Label className='text-secondary-foreground' nativeID='username'>Username</Label>
          </View>
          <Input
            className='bg-primary text-primary-foreground'
            placeholder="batman123"
            onChangeText={setUsername}
            value={username}
            autoCapitalize="none"
            aria-labelledby='inputLabel'
            aria-errormessage='inputError'
          />
        </View>

        {/* Email */}
        <View className='mb-2'>
            <View className='flex-row gap-2'>
                <IconSymbol 
                size={20} 
                name="envelope" 
                color="gray" 
                />
                <Label className='text-secondary-foreground' nativeID='email'>Email</Label>
            </View>
            <Input
                className='bg-primary text-primary-foreground'
                placeholder="email@email.com"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                aria-labelledby='inputLabel'
                aria-errormessage='inputError'
            />
        </View>

        {/* Password */}
        <View>
            <View className='flex-row gap-2'>
                <IconSymbol 
                    size={20} 
                    name="lock" 
                    color="gray" 
                />
                <Label className='text-secondary-foreground' nativeID='password'>Password</Label>
            </View>
            <Input
                className='bg-primary text-primary-foreground'
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                autoCapitalize={'none'}                
                aria-labelledby='inputLabel'
                aria-errormessage='inputError'
            />
        </View>

        {/* Button */}
        <View className="mt-5">
          <Button
            onPress={signUpWithEmail}
            disabled={loading}
            variant="secondary"
            className="w-full"
          >
            <Text className="text-secondary-foreground text-center font-medium">
              Sign up
            </Text>
          </Button>
        </View>

        <View className="mt-5">
          <Button
            onPress={() => router.replace("/sign-in")}
            disabled={loading}
            variant={"ghost"}
            className="w-full"
          >
            <Text className="text-secondary-foreground text-center font-medium">
              Already have an account? Signin
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}