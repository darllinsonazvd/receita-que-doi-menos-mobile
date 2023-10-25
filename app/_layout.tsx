import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_700Bold,
  })

  if (!hasLoadedFonts) {
    return SplashScreen.hideAsync()
  }

  return (
    <>
      <StatusBar style="auto" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </>
  )
}
