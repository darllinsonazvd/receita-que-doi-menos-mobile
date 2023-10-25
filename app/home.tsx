import { StatusBar } from 'expo-status-bar'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'

import LogoText from '../src/assets/img/logo-text.svg'

export default function Home() {
  const { top } = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-zinc-50">
      <StatusBar style="auto" />

      <View
        className="fixed left-0 top-0 w-full flex-row items-center bg-primary px-4 pb-4"
        style={{ paddingTop: top }}
      >
        <LogoText />

        <View className="flex-1 flex-row items-center justify-end gap-2">
          <Ionicons
            name="search"
            className="text-secondary"
            size={28}
            color="#932743"
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="items-center justify-center pt-4">
          <Text className="font-title text-2xl text-secondary">Home</Text>
        </View>
      </ScrollView>
    </View>
  )
}
