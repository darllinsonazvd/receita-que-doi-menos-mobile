import { StatusBar } from 'expo-status-bar'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import logoFull from '../src/assets/img/logo-full.png'
import { useRouter } from 'expo-router'

export default function App() {
  const router = useRouter()

  function handleSignIn() {
    router.push('/home')
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={16}
      className="bg-secondary"
    >
      <View className="bg-foreground flex-1 items-center">
        <StatusBar style="auto" />

        <Image
          source={logoFull}
          alt="Receita Que Dói Menos Logo"
          className="mt-36"
        />

        <View className="fixed bottom-0 left-0 mt-16 w-full flex-1 flex-col items-center justify-center rounded-t-[44px] bg-secondary px-11 py-6">
          <Text className="font-title text-2xl text-white">Bem-vindo!</Text>
          <Text className="font-body text-base text-white">
            Faça login para continuar
          </Text>

          <TextInput
            className="mt-4 w-full rounded-lg border border-white p-3 font-body text-base text-white placeholder:text-white"
            placeholder="Digite seu email"
            placeholderTextColor="#fff"
            returnKeyType="next"
            keyboardAppearance="default"
            autoComplete="email"
            enterKeyHint="next"
          />
          <TextInput
            className="mt-4 w-full rounded-lg border border-white p-3 font-body text-base text-white placeholder:text-white"
            placeholder="Digite sua senha"
            placeholderTextColor="#fff"
            keyboardAppearance="default"
            secureTextEntry
          />

          <TouchableOpacity
            activeOpacity={0.7}
            className="mt-4 w-full items-center justify-center rounded-lg bg-primary p-3"
            onPress={() => handleSignIn()}
          >
            <Text className="font-title text-lg text-secondary">Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} className="mt-4 w-full">
            <Text className="text-center font-body text-base text-white">
              Não tem uma conta? Faça seu cadastro!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}
