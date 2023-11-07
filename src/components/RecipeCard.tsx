import { useState } from 'react'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

type RecipeCardProps = {
  imgUrl: string
  name: string
  author: string
}

export function RecipeCard({ imgUrl, name, author }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  function handleFavorite() {
    setIsFavorite((prev) => !prev)
  }

  return (
    <ImageBackground
      source={{
        uri: imgUrl,
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

      <View className="absolute bottom-5 left-6">
        <Text className="font-title text-2xl text-zinc-50 shadow-xl">
          {name}
        </Text>
        <Text className="-mt-3 font-body text-lg text-zinc-50 shadow-xl">
          por {author}
        </Text>
      </View>
    </ImageBackground>
  )
}
