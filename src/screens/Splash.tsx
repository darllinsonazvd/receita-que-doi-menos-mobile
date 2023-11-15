import { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Image, Text, Animated } from 'react-native'
import LottieView from 'lottie-react-native'

import Logo from '../assets/img/logo-red-yellow.png'

export default function Splash() {
  const [animationFinished, setAnimationFinished] = useState<boolean>(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  function fadeIn() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View className="relative flex-1 items-center justify-center bg-zinc-50">
      <StatusBar style="dark" />

      <LottieView
        source={require('../assets/lottie/recipe-book.json')}
        autoPlay
        loop={false}
        useNativeLooping={false}
        resizeMode="contain"
        onAnimationFinish={() => {
          setAnimationFinished(true)
          fadeIn()
        }}
        style={{ opacity: animationFinished ? 0 : 1 }}
      />

      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={Logo}
          alt="Receita que dói menos logo"
          style={{ width: 240, height: 180 }}
        />
      </Animated.View>

      <Text className="absolute bottom-12 font-body text-base text-zinc-900">
        Feito com ❤ para a Unifacisa
      </Text>
    </View>
  )
}
