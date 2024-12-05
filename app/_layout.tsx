import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router'
import { AuthProvider, useAuth } from '../provider/AuthProvider'



const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: '',
      fontWeight: 'bold'
    },
    medium: {
      fontFamily: '',
      fontWeight: 'bold'
    },
    bold: {
      fontFamily: '',
      fontWeight: 'bold'
    },
    heavy: {
      fontFamily: '',
      fontWeight: 'bold'
    }
  }
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: '',
      fontWeight: 'bold'
    },
    medium: {
      fontFamily: '',
      fontWeight: 'bold'
    },
    bold: {
      fontFamily: '',
      fontWeight: 'bold'
    },
    heavy: {
      fontFamily: '',
      fontWeight: 'bold'
    }
  }
};

export {
// Catch any errors thrown by the Layout component.
ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

React.useEffect(() => {
  (async () => {
    const theme = await AsyncStorage.getItem('theme');
    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    if (!theme) {
      AsyncStorage.setItem('theme', colorScheme);
      setIsColorSchemeLoaded(true);
      return;
    }
    const colorTheme = theme === 'dark' ? 'dark' : 'light';
    if (colorTheme !== colorScheme) {
      setColorScheme(colorTheme);

      setIsColorSchemeLoaded(true);
      return;
    }
    setIsColorSchemeLoaded(true);
  })().finally(() => {
    SplashScreen.hideAsync();
  });
}, []);

if (!isColorSchemeLoaded) {
  return null;
}








return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </ThemeProvider>
);
}


const InitialLayout = () => {
  const { session, initialized } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!initialized) return

    // Check if the path/url is in the (auth) group
    const inAuthGroup = segments[0] === '(auth)'

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the list page
      router.replace('/explore')
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace('/sign-in')
    }
  }, [session, initialized])

  return <Stack screenOptions={{headerShown: false}}/>
}