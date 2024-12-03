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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <SafeAreaView className="mt-10 p-3">
    {/* TITLE */}
    <View className="flex-1 items-center justify-center px-4">
      <View className="flex-row items-center">
        <Text className="text-primary-foreground text-7xl font-bold mr-2">
          Capture
        </Text>
        <IconSymbol size={60} name="camera.fill" color="black" />
      </View>
     </View>

      <View className="mt-5 space-y-4">
        {/* Email */}
        <View className='mb-2'>
            <View className='flex-row gap-2'>
                <IconSymbol 
                size={20} 
                name="envelope" 
                color="gray" 
                />
                <Label className='text-primary-foreground' nativeID='email'>Email</Label>
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
                <Label className='text-primary-foreground' nativeID='password'>Password</Label>
            </View>
            <Input
                className='bg-primary'
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
            variant={"default"}
            className="w-full"
          >
            <Text className="text-primary-foreground text-center font-medium">
              Already have an account? Signin
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}