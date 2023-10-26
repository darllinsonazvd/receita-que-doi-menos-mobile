import { TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'

import LogoText from '../assets/img/logo-text.svg'

export function Header() {
  const { top } = useSafeAreaInsets()

  return (
    <View
      className="fixed left-0 top-0 w-full flex-col bg-white px-4 pb-2 shadow-md"
      style={{ paddingTop: top }}
    >
      <View className="flex-row items-center">
        <LogoText />

        <View className="flex-1 flex-row justify-end gap-1">
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="add-outline" size={30} color="#191919" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="person-circle-outline" size={30} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-4 w-full flex-row items-center rounded-lg bg-zinc-200 p-2">
        <Ionicons name="search-outline" size={22} color="#191919" />
        <TextInput
          className="ml-2 flex-1 font-body text-base text-zinc-900"
          placeholder="Procurar receita de hoje..."
          placeholderTextColor="#191919"
          cursorColor="#191919"
          returnKeyType="search"
        />
      </View>
    </View>
  )
}
