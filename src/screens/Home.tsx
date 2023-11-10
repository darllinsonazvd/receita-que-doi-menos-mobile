import { useEffect, useState } from 'react'
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

import { Header } from '../components/Header'
import { RecipeCard } from '../components/RecipeCard'

import { recipes as mockRecipes } from '../utils/mocks/recipes'
import { Recipe } from '../utils/types/recipe'
import { clearString } from '../utils/functions/clear-string'

import Background from '../assets/img/bg-register.png'

type HomeProps = {
  navigation: any
}

export default function Home({ navigation }: HomeProps) {
  const [search, setSearch] = useState<string>('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /** Fake search (searching recipes in memory 😜) */
  function handleSearch(searchTerm: string) {
    setIsLoading(true)

    const cleanSearchTerm = clearString(searchTerm)
    setSearch(cleanSearchTerm)

    const filteredRecipes = recipes.filter((recipe) => {
      const cleanRecipeName = clearString(recipe.name)
      const cleanAuthorName = clearString(recipe.author)

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
    setRecipes(mockRecipes)
  }

  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Bem-vindo, João da Silva',
      text2: 'Sinta-se em casa e aproveite nossas delícias 😋',
      visibilityTime: 3000,
      position: 'bottom',
    })

    setRecipes(mockRecipes)
  }, [])

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
          className="px-4"
          source={Background}
          resizeMode="cover"
        >
          <View className="items-start justify-center py-6">
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
                    imgUrl={recipe.imgUrl}
                    name={recipe.name}
                    author={recipe.author}
                    showFavoriteButton={true}
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
