import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { RecipeCard } from '../components/RecipeCard'

import { recipes } from '../utils/mocks/recipes'

type HomeProps = {
  navigation: any
}

export default function Home({ navigation }: HomeProps) {
  return (
    <View className="flex-1 bg-zinc-100">
      <StatusBar style="dark" />

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
    </View>
  )
}
