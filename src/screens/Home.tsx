import { useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import Spinner from 'react-native-loading-spinner-overlay'

import { RecipeCard } from '../components/RecipeCard'

import { recipes } from '../utils/mocks/recipes'

type HomeProps = {
  navigation: any
}

export default function Home({ navigation }: HomeProps) {
  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Bem-vindo, João da Silva',
      text2: 'Sinta-se em casa e aproveite nossas delícias 😋',
      visibilityTime: 3000,
      position: 'bottom',
    })
  }, [])

  return (
    <View className="flex-1 bg-zinc-100">
      <StatusBar style="dark" />

      <Spinner />

      <ScrollView className="flex-1 px-4">
        <View className="items-start justify-center py-6">
          <Text className="mb-6 font-mouse text-4xl text-zinc-900">
            Mais populares
          </Text>

          {recipes.map((recipe) => {
            return (
              <TouchableOpacity
                className="w-full"
                activeOpacity={0.9}
                key={recipe.id}
                onPress={() =>
                  navigation.navigate('RecipeDetails', { recipeId: recipe.id })
                }
              >
                <RecipeCard
                  imgUrl={recipe.imgUrl}
                  name={recipe.name}
                  author={recipe.author}
                  showFavoriteButton={true}
                />
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

      <Toast />
    </View>
  )
}
