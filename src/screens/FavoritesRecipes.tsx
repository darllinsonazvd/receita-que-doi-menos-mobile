import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { JwtDecode } from '../utils/types/jwt'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SecureStoreKeys } from '../utils/enums/secure-store-keys';
import * as SecureStore from 'expo-secure-store';
import { privateApi } from '../lib/api';
import { jwtDecode } from '../utils/functions/jwt-decode';
import { RecipeCard } from '../components/RecipeCard'
import { Recipe } from '../utils/types/recipe';

import Background from '../assets/img/bg-register.png'

type FavoritesRecipesProps = {
  navigation: any
}

export default function FavoritesRecipes({
  navigation,
}: FavoritesRecipesProps) {
  const { top } = useSafeAreaInsets()
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userInfo, setUserInfo] = useState<JwtDecode | null>(null);

  const fetchRecipes = () => {
    if (userInfo) {
      const { user_id } = userInfo; 
      privateApi
        .get(`/user/favoriteRecipes/${user_id}`)
        .then((response) => {
          setRecipes(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar receitas:', error);
        });
    }
  }
  useEffect(() => {
    /** Recuperando informações do usuário autenticado */
    SecureStore.getItemAsync(SecureStoreKeys.TOKEN).then((token) => {
      const decodedToken = jwtDecode(token || '')
      setUserInfo(decodedToken)
    })
  }, [])

  useEffect(() => {
    if (userInfo) {
      fetchRecipes();
    }
  }, [userInfo]);


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
        <ImageBackground source={Background} className="flex-1 bg-zinc-200 p-4">
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
                  key={recipe.id}
                  recipe={recipe}
                  showFavoriteButton={true}
                />
              </TouchableOpacity>
            )
          })}
        </ImageBackground>
      </ScrollView>
    </View>
  )
}
