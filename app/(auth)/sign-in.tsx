import SignIn from '@/components/auth/Signin'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import 'react-native-url-polyfill/auto'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)


  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      // console.log(session?.user.email)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  

  return (
    <ScrollView className='bg-background'>
      <View>
        <SignIn/>
        {/* {session && session.user && <Text className='text-primary-foreground'>{session.user.id}</Text>} */}
      </View>
    </ScrollView>
  )
}