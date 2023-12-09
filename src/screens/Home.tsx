import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import Spinner from 'react-native-loading-spinner-overlay'
import * as SecureStore from 'expo-secure-store'

import { Header } from '../components/Header'
import { RecipeCard } from '../components/RecipeCard'
import { useFocusEffect } from '@react-navigation/native'
import Background from '../assets/img/bg-register.png'
import { SecureStoreKeys } from '../utils/enums/secure-store-keys'
import { clearString } from '../utils/functions/clear-string'
import { privateApi } from '../lib/api'
import { jwtDecode } from '../utils/functions/jwt-decode'
import { Recipe } from '../utils/types/recipe'

type HomeProps = {
  navigation: any
}

export default function Home({ navigation }: HomeProps) {
  const [search, setSearch] = useState<string>('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchRecipes = () => {
    setIsLoading(true)

    privateApi
      .get('/meals/all')
      .then((response) => {
        setRecipes(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Erro ao buscar receitas:', error)
        setIsLoading(false)
      })
  }

  /** Fake search (searching recipes in memory 😜) */
  function handleSearch(searchTerm: string) {
    setIsLoading(true)

    const cleanSearchTerm = clearString(searchTerm)
    setSearch(cleanSearchTerm)

    const filteredRecipes = recipes.filter((recipe) => {
      const cleanRecipeName = clearString(recipe.name)
      const cleanAuthorName = clearString(recipe.creator.name)

      return (
        cleanRecipeName.includes(cleanSearchTerm) ||
        cleanAuthorName.includes(cleanSearchTerm)
      )
    })

    setTimeout(() => {
      setRecipes(filteredRecipes)
      setIsLoading(false)
    }, 1500)
  }

  function handleCancelSearch() {
    setSearch('')
    setIsSearching(false)
    fetchRecipes()
  }

  useEffect(() => {
    fetchRecipes()

    SecureStore.getItemAsync(SecureStoreKeys.TOKEN).then((token) => {
      const decodedToken = jwtDecode(token || '')
      Toast.show({
        type: 'success',
        text1: `Bem-vindo, ${decodedToken.user_name}`,
        text2: 'Sinta-se em casa e aproveite nossas delícias 😋',
        visibilityTime: 3000,
        position: 'bottom',
      })

      privateApi.get(`user/info/${decodedToken.user_id}`).then((response) => {
        const { favoriteMealsID } = response.data
        setFavoriteRecipes(favoriteMealsID)
      })
    })
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchRecipes()
    }, []),
  )

  const favorited = (recipeId: string): boolean => {
    return favoriteRecipes.includes(recipeId)
  }

  return (
    <View className="flex-1 bg-zinc-100">
      <StatusBar style="dark" />

      <Spinner
        visible={isLoading}
        textContent="Aguarde..."
        textStyle={{ color: '#fff', fontFamily: 'Baloo2_400Regular' }}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.5)"
      />

      <Header
        navigation={navigation}
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        handleSearch={handleSearch}
        handleCancelSearch={handleCancelSearch}
      />

      <ScrollView className="flex-1 bg-zinc-50">
        <ImageBackground
          className="flex-1 px-4"
          source={Background}
          resizeMode="cover"
        >
          <View className="flex-1 items-start justify-center py-6">
            {isSearching ? (
              <Text className="mb-6 font-title text-xl text-zinc-900">
                Estes são os resultados para: {search}
              </Text>
            ) : (
              <Text className="mb-6 font-mouse text-4xl text-zinc-900">
                Mais populares
              </Text>
            )}

            {recipes.map((recipe) => {
              return (
                <TouchableOpacity
                  className="w-full"
                  activeOpacity={0.9}
                  key={recipe.id}
                  onPress={() =>
                    navigation.navigate('RecipeDetails', {
                      recipeId: recipe.id,
                    })
                  }
                >
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    showFavoriteButton={true}
                    favoritedRecipe={favorited(recipe.id)}
                  />
                </TouchableOpacity>
              )
            })}
          </View>
        </ImageBackground>
      </ScrollView>

      <Toast />
    </View>
  )
}
