import { useContext } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { AuthContext } from '../auth/AuthenticationContext'
import { RecipeCard } from '../components/RecipeCard'

export default function Home() {
  const recipes = [
    {
      id: '1892dh9128h',
      name: 'Tapioca de sempre',
      imgUrl:
        'https://www.receiteria.com.br/wp-content/uploads/receitas-de-tapioca.png',
      author: 'Rafael Macedo',
    },
    {
      id: '78923y7823y8ed7h23',
      name: 'Macarrão com molho clássico',
      imgUrl:
        'https://static.itdg.com.br/images/1200-675/a2bf9d7f00b7987438ea4a3b1b420c9e/350392-original.jpg',
      author: 'Darllinson Azevedo',
    },
    {
      id: 'd89h1j2198h',
      name: 'Vaca atolada',
      imgUrl:
        'https://j6t2y8j5.rocketcdn.me/wp-content/uploads/2023/02/3-18.jpg',
      author: 'Ramon Montenegro',
    },
    {
      id: '12899d8h12',
      name: 'Bolinho de leite',
      imgUrl:
        'https://blog.supernosso.com/wp-content/uploads/2023/08/OMGyMNIsu-o.jpg',
      author: 'Pedro Henrique',
    },
    {
      id: '8921hd9821h98',
      name: 'Fava de domingo',
      imgUrl:
        'https://www.deline.com.br/assets/images/recipes/favada-com-dobradinha/mobile/thumb-video.jpg?v3',
      author: 'Pedro Azevedo',
    },
  ]

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
