// import React, { useState } from 'react'
// import { Alert, TextInput, View } from 'react-native'
// import { supabase } from '../lib/supabase'
// import { Text } from "./ui/text"
// import { Button } from './ui/button'
// import { IconSymbol } from './ui/IconSymbol'
// import "../global.css"
// import { Input } from './ui/input'
// import { Label } from './ui/label'

// export default function Auth() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   async function signInWithEmail() {
//     setLoading(true)
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     if (error) Alert.alert(error.message)
        
//     setLoading(false)
//   }

//   async function signUpWithEmail() {
//     setLoading(true)
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.signUp({
//       email,
//       password,
//     })

//     if (error) Alert.alert(error.message)
//     if (!session) Alert.alert('Please check your inbox for email verification!')
//     setLoading(false)
//   }

//   return (
//     <View className="mt-10 p-3">
//       <View className="mt-5 space-y-4">


//         {/* Email */}
//         <View>
//             <View className='flex-row gap-2'>
//                 <IconSymbol 
//                 size={20} 
//                 name="envelope" 
//                 color="gray" 
//                 />
//                 <Label nativeID='email'>Email</Label>
//             </View>
//             <Input
//                 placeholder="email@email.com"
//                 onChangeText={setEmail}
//                 value={email}
//                 keyboardType="email-address"
//                 aria-labelledby='inputLabel'
//                 aria-errormessage='inputError'
//             />
//         </View>



//         {/* Password */}
//         <View>
//             <View className='flex-row gap-2'>
//                 <IconSymbol 
//                     size={20} 
//                     name="lock" 
//                     color="gray" 
//                 />
//                 <Label nativeID='password'>Password</Label>
//             </View>
//             <Input
//                 placeholder="Password"
//                 onChangeText={setPassword}
//                 value={password}
//                 secureTextEntry={true}
//                 autoCapitalize={'none'}                
//                 aria-labelledby='inputLabel'
//                 aria-errormessage='inputError'
//             />
//         </View>





//         {/* Buttons */}
//         <View className="mt-5 space-y-3">
//           <Button
//             onPress={signInWithEmail}
//             disabled={loading}
//             variant={"outline"}
//             className="w-full"
//           >
//             <Text className="text-white text-center font-medium">
//               Sign in
//             </Text>
//           </Button>

//           <Button
//             onPress={signUpWithEmail}
//             disabled={loading}
//             variant="secondary"
//             className="w-full"
//           >
//             <Text className="text-white text-center font-medium">
//               Sign up
//             </Text>
//           </Button>
//         </View>
//       </View>
//     </View>
//   )
// }