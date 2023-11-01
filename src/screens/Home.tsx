import { useContext } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { AuthContext } from '../auth/AuthenticationContext'

import Meals from '../assets/img/meals.svg'

export default function Home() {
  const { signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }

  return (
    <View className="flex-1 bg-zinc-100">
      <StatusBar style="dark" />

      <ScrollView className="flex-1">
        <View className="items-center justify-center pt-8">
          <Meals />

          <Text className="mt-2 font-mouse text-2xl text-zinc-900">
            Mais populares
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            className="mt-4 w-full items-center justify-center rounded-full bg-success p-3"
            onPress={() => handleSignOut()}
          >
            <Text className="font-title text-lg text-white">Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
