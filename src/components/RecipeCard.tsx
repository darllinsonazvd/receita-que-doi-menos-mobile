import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Recipe } from '../utils/types/recipe'
import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from '../utils/functions/jwt-decode'

import { SecureStoreKeys } from '../utils/enums/secure-store-keys'
import { privateApi } from '../lib/api'
import Toast from 'react-native-toast-message'

type RecipeCardProps = {
  recipe: Recipe
  showFavoriteButton: boolean
  favoritedRecipe: boolean
}

export function RecipeCard({
  recipe,
  showFavoriteButton,
  favoritedRecipe,
}: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    SecureStore.getItemAsync(SecureStoreKeys.TOKEN).then((token) => {
      const decodedToken = jwtDecode(token || '')
      setUserInfo(decodedToken)
    })
    setIsFavorite(favoritedRecipe)
  }, [])
  const handleFavorite = () => {
    const userID: string = userInfo.user_id
    const mealID: string = recipe.id
    if (!isFavorite) {
      privateApi
        .put(`/user/likeMeal/${userID}/${mealID}`)
        .then(() => {
          setIsFavorite((prev) => !prev)
          Toast.show({
            type: 'success',
            text1: `Receita Favoritada com Sucesso!`,
            text2: 'Veja suas receitas favoritas na sua aba de perfil',
            visibilityTime: 3000,
            position: 'bottom',
          })
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: `Não foi possível favoritar sua receita!`,
            visibilityTime: 3000,
            position: 'bottom',
          })
          console.error(`Erro ao favoritar Receita: ${error}`)
        })
    } else {
      privateApi
        .put(`/user/unlikeMeal/${userID}/${mealID}`)
        .then(() => {
          setIsFavorite((prev) => !prev)
          Toast.show({
            type: 'success',
            text1: `Receita Defavoritada com Sucesso!`,
            visibilityTime: 3000,
            position: 'bottom',
          })
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: `Não foi possível Defavoritar sua receita!`,
            visibilityTime: 3000,
            position: 'bottom',
          })
          console.error(`Erro ao favoritar Receita: ${error}`)
        })
    }
  }

  const { photo, name, creator } = recipe

  return (
    <ImageBackground
      source={{
        uri: photo,
      }}
      className="relative mb-5 h-40 w-full overflow-hidden"
      imageStyle={{
        borderRadius: 30,
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 60,
      }}
    >
      <View
        className="absolute left-0 top-0 h-full w-full bg-zinc-950/30"
        style={{
          borderRadius: 30,
          borderTopRightRadius: 60,
          borderBottomLeftRadius: 60,
        }}
      />
      {showFavoriteButton && (
        <TouchableOpacity
          onPress={handleFavorite}
          activeOpacity={0.8}
          className="absolute right-6 top-5 h-10 w-10 items-center justify-center rounded-full bg-zinc-950/20"
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#FE2A15' : '#fff'}
          />
        </TouchableOpacity>
      )}

      <View className="absolute bottom-5 left-6">
        <Text className="font-title text-2xl text-zinc-50 shadow-xl">
          {name}
        </Text>
        <Text className="-mt-3 font-body text-lg text-zinc-50 shadow-xl">
          por {creator.name}
        </Text>
      </View>
    </ImageBackground>
  )
}
