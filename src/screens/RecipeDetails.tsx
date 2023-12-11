/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Alert,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { privateApi } from '../lib/api'
import { Recipe } from '../utils/types/recipe'
import { IngredientItem } from '../components/IngredientItem'

import BgRecipe from '../assets/img/bg-recipe.png'

type RecipeDetailsProps = {
  navigation: any
  route: any
}

export const getRecipeById = async (recipeId: string) => {
  try {
    const response = await privateApi.get(`/meals/byMealID/${recipeId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar a receita:', error)
    throw new Error('Erro ao buscar a receita')
  }
}

export default function RecipeDetails({
  route,
  navigation,
}: RecipeDetailsProps) {
  const { recipeId } = route.params as { recipeId: string }

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFullInstructions, setShowFullInstructions] = useState(false)

  const handleOpenVideo = async (url: string) => {
    const URL = url || 'https://youtube.com/'
    const supported = await Linking.canOpenURL(URL)

    if (supported) {
      await Linking.openURL(URL)
    } else {
      Alert.alert(
        `Não foi possível acessar a url: ${URL}, contate os administradores do Receita!`,
      )
    }
  }

  function handleFavorite() {
    setIsFavorite((prev) => !prev)
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const foundRecipe = await getRecipeById(recipeId)
        setRecipe(foundRecipe)
        setIsFavorite(foundRecipe.isFavorite)
      } catch (error) {
        console.error('Erro ao buscar a receita:', error)
      }
    }

    fetchRecipe()
  }, [])

  return (
    <View className="flex-1">
      <StatusBar style="dark" />

      <ImageBackground
        source={{ uri: recipe?.photo }}
        resizeMode="cover"
        className="relative flex-[0.6] items-center justify-center"
      >
        <TouchableOpacity
          onPress={handleFavorite}
          activeOpacity={0.7}
          className="absolute right-4 top-12 h-10 w-10 items-center justify-center rounded-full bg-zinc-950/30"
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#FE2A15' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          className="absolute left-4 top-12 h-10 w-10 items-center justify-center rounded-full bg-zinc-950/30"
        >
          <Ionicons name="arrow-back-outline" size={20} color="#fff" />
        </TouchableOpacity>

        <View className="absolute bottom-0 left-0 w-full rounded-t-3xl bg-zinc-950/50 p-4 backdrop-blur-sm">
          <Text className="font-title text-2xl text-zinc-50">
            {recipe?.name}
          </Text>
          <Text className="-mt-2 font-body text-lg text-zinc-50 shadow-xl">
            por {recipe?.creator.name}
          </Text>
        </View>
      </ImageBackground>
      <ScrollView className="flex-1">
        <ImageBackground
          source={BgRecipe}
          className="flex-1 bg-zinc-200 p-4"
          resizeMode="cover"
        >
          <View className="w-full rounded-2xl bg-zinc-100 p-4">
            <Text className="font-mouse text-3xl text-zinc-900">
              Instruções
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowFullInstructions((prev) => !prev)}
            >
              {showFullInstructions ? (
                <Text className="mt-2 font-body text-lg text-zinc-900">
                  {recipe?.instructions}
                </Text>
              ) : (
                <Text className="mt-2 font-body text-lg text-zinc-900">
                  {recipe?.instructions.substring(0, 115).concat('...')}{' '}
                  <Text className="font-title">Ver mais</Text>
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="mt-4 w-full rounded-2xl bg-zinc-100 p-4">
            <Text className="mb-2 font-mouse text-3xl text-zinc-900">
              Ingredientes
            </Text>
            {recipe?.ingredients.map((ingredient: string, index: number) => (
              <IngredientItem key={index} name={ingredient} />
            ))}
          </View>
          {recipe?.video ? (
            <View className="mb-8 mt-4 w-full rounded-2xl bg-zinc-100 p-4">
              <Text className="mb-2 font-mouse text-3xl text-zinc-900">
                Tá enrolado? Assista esse vídeo!
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleOpenVideo(recipe.video)}
              >
                <Text className="mt-2 font-body text-lg text-zinc-900">
                  Oba! Nosso(a) 👩‍🍳 Chef 👨‍🍳 liberou um vídeo sobre a receita,
                  para assistir{' '}
                  <Text className="font-title text-zinc-900">clique aqui</Text>{' '}
                  e Receite, que dói menos!
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="mb-8 mt-4 w-full rounded-2xl bg-zinc-100 p-4">
              <Text className="mb-2 font-mouse text-3xl text-zinc-900">
                Poxa Vida! 😓
              </Text>
              <Text className="mb-2 font-mouse text-lg text-zinc-900">
                Infelizmente nosso Chef não disponibilizou vídeo!
              </Text>
              <Text className="font-title text-zinc-900">
                Mas quem arrisca não petisca, não é mesmo?
              </Text>
            </View>
          )}
        </ImageBackground>
      </ScrollView>
    </View>
  )
}
