import { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { AuthContext } from '../auth/AuthenticationContext'

import BgRecipe from '../assets/img/bg-recipe.png'

type ProfileProps = {
  navigation: any
}

export default function Profile({ navigation }: ProfileProps) {
  const { top } = useSafeAreaInsets()

  const { signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }

  function changePhoto() {
    Alert.alert(
      'Nosso time está trabalhando com carinho nessa funcionalidade 😁. Aguarde as próximas atualizações!',
    )
  }

  return (
    <View className="flex-1 bg-zinc-100" style={{ paddingTop: top }}>
      <StatusBar style="dark" backgroundColor="transparent" />

      <View className="relative mt-4 items-center justify-center pb-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="absolute -top-0.5 left-4"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#191919" />
        </TouchableOpacity>
        <Text className="font-title text-2xl">Seu perfil</Text>
      </View>

      <ImageBackground source={BgRecipe} className="flex-1 p-4">
        <View className="w-full flex-col items-center rounded-2xl bg-zinc-100 p-4">
          <View className="relative h-24 w-24 items-center justify-center rounded-full border border-zinc-300">
            <Text className="text-5xl">👨‍🍳</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              className="absolute bottom-0 right-0 "
              onPress={() => changePhoto()}
            >
              <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Ionicons name="pencil-outline" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-3 flex-col items-center justify-center">
            <Text className="font-title text-2xl">João da Silva</Text>
            <Text className="-mt-2 font-body text-base">joao@exemplo.com</Text>
          </View>
        </View>

        <TouchableOpacity
          className="mt-4 w-full flex-row items-center rounded-2xl bg-zinc-100 p-4"
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MyRecipes')}
        >
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
              <Ionicons name="restaurant-outline" size={22} color="#FAC801" />
            </View>

            <Text className="ml-4 font-body text-xl">Minhas receitas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4 w-full flex-row items-center rounded-2xl bg-zinc-100 p-4"
          activeOpacity={0.7}
          onPress={() => navigation.navigate('FavoritesRecipes')}
        >
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
              <Ionicons name="heart-outline" size={22} color="#FAC801" />
            </View>

            <Text className="ml-4 font-body text-xl">Receitas favoritas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-4 w-full flex-row items-center justify-center bg-secondary p-3"
          style={{
            borderRadius: 20,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 40,
          }}
          onPress={() => handleSignOut()}
        >
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text className="ml-1 font-title text-lg text-white">Sair</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}
