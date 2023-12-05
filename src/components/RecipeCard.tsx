import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { Recipe } from '../utils/types/recipe';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

import type { JwtDecode } from '../utils/types/jwt';

type RecipeCardProps = {
  recipe: Recipe;
  showFavoriteButton: boolean;
};

export function RecipeCard({ recipe, showFavoriteButton }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    SecureStore.getItemAsync('TOKEN').then((token) => {
      const decodedToken = jwtDecode(token || '');
      setUserInfo(decodedToken);
    });
  }, []);

  async function handleFavorite() {
    setIsFavorite((prev) => !prev);
    try {
      const token = await SecureStore.getItemAsync('TOKEN');
      
      // Use o tipo JwtDecode para representar o payload decodificado do token JWT
      const decodedToken = jwtDecode(token || '') as JwtDecode;
      const userID = decodedToken?.user_id;
      const mealID = recipe.id;
  
      if (userID) {
        const url = `https://receita-que-doi-menos-server.up.railway.app/user/likeMeal/${userID}/${mealID}`;
        await axios.put(url, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Erro ao favoritar a receita:', error);
    }
  }

  const { photo, name, creator } = recipe;

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
      {/* Restante do seu código... */}
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

const HomeScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = await SecureStore.getItemAsync('TOKEN');
        const decodedToken = jwtDecode(token || '');
        setUserInfo(decodedToken);

        const response = await axios.get('https://receita-que-doi-menos-server.up.railway.app/meals/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: Recipe[] = response.data;
        setRecipes(data);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <View>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
          showFavoriteButton={true}
        />
      ))}
    </View>
  );
};

export default HomeScreen;