import { useContext } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { AuthContext } from '../auth/AuthenticationContext'

import { RecipeCard } from '../components/RecipeCard'

import { recipes } from '../utils/mocks/recipes'

type HomeProps = {
  navigation: any
}

export default function Home({ navigation }: HomeProps) {
  const { signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }

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
                />
              </TouchableOpacity>
            )
          })}

          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full items-center justify-center bg-success p-3"
            style={{
              borderRadius: 20,
              borderTopRightRadius: 40,
              borderBottomLeftRadius: 40,
            }}
            onPress={() => handleSignOut()}
          >
            <Text className="font-title text-lg text-white">Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
