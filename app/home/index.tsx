import { ScrollView, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import Meals from '../../src/assets/img/meals.svg'

export default function Home() {
  return (
    <View className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />

      <ScrollView className="flex-1">
        <View className="items-center justify-center pt-8">
          <Meals />

          <Text className="font-mouse mt-2 text-2xl text-zinc-900">
            Mais populares
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
