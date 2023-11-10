import { useState } from 'react'
import { Image, TextInput, TouchableOpacity, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import Popover from 'react-native-popover-view'

import LogoYellow from '../assets/img/logo-red-yellow.png'

type HeaderProps = {
  navigation: any
  handleSearch: (searchTerm: string) => void
  handleCancelSearch: () => void
  isSearching: boolean
  setIsSearching: (prev: any) => void
  search: string
  setSearch: (value: string) => void
}

export function Header({
  navigation,
  handleSearch,
  handleCancelSearch,
  isSearching,
  setIsSearching,
  search,
  setSearch,
}: HeaderProps) {
  const { top } = useSafeAreaInsets()

  const [showPopover, setShowPopover] = useState<boolean>(false)

  return (
    <View
      className="fixed left-0 top-0 w-full flex-col bg-zinc-50 px-4 pb-2 shadow-md"
      style={{ paddingTop: top }}
    >
      <View className="flex-row items-center">
        <Image
          source={LogoYellow}
          alt="Receita que dói menos logo"
          style={{ width: 70, height: 55 }}
        />

        <View className="flex-1 flex-row items-center justify-end gap-1">
          <Popover
            isVisible={showPopover}
            onRequestClose={() => setShowPopover(false)}
            from={
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowPopover(true)}
              >
                <Ionicons name="add-outline" size={30} color="#191919" />
              </TouchableOpacity>
            }
            popoverStyle={{
              borderRadius: 16,
              padding: 16,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-center gap-1"
              onPress={() => {
                setShowPopover(false)
                navigation.navigate('PublishRecipe')
              }}
            >
              <Ionicons name="add-circle-outline" size={24} color="#191919" />
              <Text className="font-body text-base">Publicar receita</Text>
            </TouchableOpacity>
          </Popover>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={30} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-4 w-full flex-row items-center rounded-full bg-zinc-200 px-3 py-2">
        <Ionicons name="search-outline" size={22} color="#191919" />
        <TextInput
          className="ml-2 flex-1 font-body text-base text-zinc-900"
          placeholder="Procurar receita de hoje..."
          placeholderTextColor="#191919"
          cursorColor="#191919"
          returnKeyType="search"
          onChangeText={(newTerm) => setSearch(newTerm)}
          defaultValue={search}
          onSubmitEditing={() => {
            if (search.trim()) {
              handleSearch(search.trim())
              setIsSearching(true)
            }
          }}
        />
        {isSearching && (
          <TouchableOpacity activeOpacity={0.7} onPress={handleCancelSearch}>
            <Ionicons name="close-outline" size={22} color="#191919" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
