import { View, Text } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';

const Loading = () => {
  return (
    <View className='flex-1 items-center justify-center animate-spin'>
        <Feather name="loader" size={24} color="gray" />
    </View>
  )
}

export default Loading