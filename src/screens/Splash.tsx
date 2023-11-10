import { StatusBar } from 'expo-status-bar'
import { View, Image, Text } from 'react-native'

import Logo from '../assets/img/logo-red-yellow.png'

export default function Splash() {
  return (
    <View className="relative flex-1 items-center justify-center bg-zinc-50">
      <StatusBar style="dark" />

      <Image
        source={Logo}
        alt="Receita que dói menos logo"
        style={{ width: 240, height: 180 }}
      />

      <Text className="absolute bottom-12 font-body text-base text-zinc-900">
        Feito com ❤ para a Unifacisa
      </Text>
    </View>
  )
}
