import { useEffect } from 'react'
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { SplashScreen, Stack } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [hasLoadedFonts, hasErrorOnLoadFonts] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_700Bold,
  })

  useEffect(() => {
    if (hasLoadedFonts || hasErrorOnLoadFonts) {
      SplashScreen.hideAsync()
    }
  }, [hasLoadedFonts, hasErrorOnLoadFonts])

  if (!hasLoadedFonts && !hasErrorOnLoadFonts) {
    return null
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
    </Stack>
  )
}
