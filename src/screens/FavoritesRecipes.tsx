import { StatusBar } from 'expo-status-bar'
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'

import { recipes } from '../utils/mocks/recipes'

import { RecipeCard } from '../components/RecipeCard'

import BgRecipe from '../assets/img/bg-recipe.png'

type FavoritesRecipesProps = {
  navigation: any
}

export default function FavoritesRecipes({
  navigation,
}: FavoritesRecipesProps) {
  const { top } = useSafeAreaInsets()

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
        <Text className="font-title text-2xl">Receitas Favoritas</Text>
      </View>

      <ScrollView className="flex-1">
        <ImageBackground source={BgRecipe} className="flex-1 bg-zinc-200 p-4">
          <View className="mb-4 w-full flex-row">
            <View className="mr-2 h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
              <Text className="text-xl">👨‍🍳</Text>
            </View>

            <View className="flex-1 flex-row items-center rounded-2xl bg-zinc-100 p-4 shadow-xl">
              <Text className="font-body text-base">
                Alguém aqui XONOU 😍 nas nossas receitinhas. Confira elas aqui e
                lembre-se: Receite! Que dói menos 😜
              </Text>
            </View>
          </View>

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
                  showFavoriteButton={false}
                />
              </TouchableOpacity>
            )
          })}
        </ImageBackground>
      </ScrollView>
    </View>
  )
}
