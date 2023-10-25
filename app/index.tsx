import { StatusBar } from 'expo-status-bar'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import logoFull from '../assets/img/logo-full.png'

export default function App() {
  return (
    <KeyboardAwareScrollView enableOnAndroid={true} className="bg-primary">
      <View className="flex-1 items-center bg-primary">
        <StatusBar style="auto" />

        <Image
          source={logoFull}
          alt="Receita Que Dói Menos Logo"
          className="mt-44"
        />

        <View className="fixed bottom-0 left-0 mt-16 w-full flex-1 flex-col items-center justify-center rounded-t-[44px] bg-secondary px-11 py-16">
          <Text className="font-title text-2xl text-white">Bem-vindo!</Text>
          <TextInput
            className="mt-4 w-full rounded-lg border border-white p-4 font-body text-base text-white placeholder:text-white"
            placeholder="Digite seu email"
            placeholderTextColor="#fff"
            returnKeyType="next"
            keyboardAppearance="default"
            autoComplete="email"
            enterKeyHint="next"
          />
          <TextInput
            className="mt-4 w-full rounded-lg border border-white p-4 font-body text-base text-white placeholder:text-white"
            placeholder="Digite sua senha"
            placeholderTextColor="#fff"
            keyboardAppearance="default"
            secureTextEntry
          />

          <TouchableOpacity
            activeOpacity={0.7}
            className="mt-4 w-full items-center justify-center rounded-lg bg-primary p-4"
          >
            <Text className="font-title text-lg text-secondary">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}
