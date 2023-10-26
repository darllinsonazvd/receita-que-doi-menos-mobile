import { TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'

import LogoText from '../assets/img/logo-text.svg'

export function Header() {
  const { top } = useSafeAreaInsets()

  return (
    <View
      className="fixed left-0 top-0 w-full flex-col bg-primary px-4 pb-2 shadow-sm"
      style={{ paddingTop: top }}
    >
      <View className="flex-row items-center">
        <LogoText />

        <View className="flex-1 flex-row justify-end">
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="person-circle-outline" size={30} color="#932743" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-4 w-full flex-row items-center rounded-lg bg-white/30 p-2">
        <Ionicons name="search-outline" size={22} color="#932743" />
        <TextInput
          className="ml-2 flex-1 font-body text-sm text-secondary"
          placeholder="Pesquise por receitas..."
          placeholderTextColor="#932743"
          clearButtonMode="always"
          cursorColor="#932743"
          returnKeyType="search"
        />
      </View>
    </View>
  )
}
