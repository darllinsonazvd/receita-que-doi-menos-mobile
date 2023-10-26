import { useEffect } from 'react'
import {
  useFonts,
  Baloo2_400Regular,
  Baloo2_700Bold,
} from '@expo-google-fonts/baloo-2'
import { MouseMemoirs_400Regular } from '@expo-google-fonts/mouse-memoirs'
import { Slot, SplashScreen } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [hasLoadedFonts, hasErrorOnLoadFonts] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
    MouseMemoirs_400Regular,
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
