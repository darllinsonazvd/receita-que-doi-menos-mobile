import { useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from '@expo/vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay'

import { AuthContext } from '../auth/AuthenticationContext'

import LogoMixed from '../assets/img/logo-red-yellow.png'

type RegisterProps = {
  navigation: any
}

export default function Register({ navigation }: RegisterProps) {
  const { signIn } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleRegister() {
    setIsLoading((prev) => !prev)

    setTimeout(() => {
      setIsLoading((prev) => !prev)

      setTimeout(() => {
        signIn({
          email: 'dummy@email.com',
          password: 'test123',
        })
      }, 500)
    }, 2000)
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 px-4">
      <Spinner
        visible={isLoading}
        textContent="Aguarde..."
        textStyle={{ color: '#fff', fontFamily: 'Baloo2_400Regular' }}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.5)"
      />

      <StatusBar style="dark" backgroundColor="transparent" />
      <View className="relative mt-4 items-center justify-center">
        <TouchableOpacity
          activeOpacity={0.7}
          className="absolute -top-0.5 left-4"
          onPress={() => navigation.navigate('SignIn')}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#191919" />
        </TouchableOpacity>
        <Text className="font-title text-2xl">Crie sua conta</Text>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={16}
        className="flex-1 px-4"
      >
        <View className="mt-2 items-center justify-center">
          <Image
            source={LogoMixed}
            alt="Receita Que Dói Menos Logo"
            style={{ width: 100, height: 70 }}
          />
        </View>
        <Text className="mt-2 text-center font-body text-lg">
          Ainda dói e você não Receita? 😱
        </Text>
        <Text className="-mt-2 text-center font-body text-lg">
          Se achegue, é de graça!
        </Text>
        <Text className="mt-2 text-center font-title text-xl">
          Antes, vamos precisar de algumas informações ⬇
        </Text>

        <View className="mt-4 flex-1">
          {/* Name */}
          <Text className="font-title text-lg leading-relaxed text-zinc-900">
            Digite seu nome
          </Text>
          <TextInput
            className="mt-1 w-full rounded-full border border-zinc-900 px-4 py-3 font-body text-base text-zinc-900"
            placeholder="João da Silva"
            placeholderTextColor="#131313"
            returnKeyType="next"
            keyboardAppearance="default"
            autoComplete="name"
            enterKeyHint="next"
            cursorColor="#131313"
          />

          {/* Email */}
          <Text className="mt-4 font-title text-lg leading-relaxed text-zinc-900">
            Digite seu e-mail
          </Text>
          <TextInput
            className="mt-1 w-full rounded-full border border-zinc-900 px-4 py-3 font-body text-base text-zinc-900"
            placeholder="seumail@exemplo.com"
            placeholderTextColor="#131313"
            returnKeyType="next"
            keyboardAppearance="default"
            autoComplete="email"
            enterKeyHint="next"
            cursorColor="#131313"
          />

          {/* Password */}
          <Text className="mt-4 font-title text-lg leading-relaxed text-zinc-900">
            Digite sua senha
          </Text>
          <TextInput
            className="mt-1 w-full rounded-full border border-zinc-900 px-4 py-3 font-body text-base text-zinc-900"
            placeholder="com pelo menos 6 caracteres"
            placeholderTextColor="#131313"
            keyboardAppearance="default"
            secureTextEntry
            cursorColor="#131313"
          />
        </View>

        <Text className="mt-4 text-center font-body text-lg text-zinc-900">
          Ao se cadastrar você concorda com os nossos{' '}
          <Text className="font-title text-zinc-900 underline">
            Termos de Uso{' '}
          </Text>
          e{' '}
          <Text className="font-title text-zinc-900 underline">
            Política de privacidade
          </Text>
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-4 w-full items-center justify-center bg-success p-3"
          style={{
            borderRadius: 20,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 40,
          }}
          onPress={() => handleRegister()}
        >
          <Text className="font-title text-lg text-white">Criar conta</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
