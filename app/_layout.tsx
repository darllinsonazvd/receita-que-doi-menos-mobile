import { useEffect } from 'react'
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { Slot, SplashScreen } from 'expo-router'

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
    <Slot
      screenOptions={{
        animation: 'simple_push',
      }}
    />
  )
}
