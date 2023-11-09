import { useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Spinner from 'react-native-loading-spinner-overlay'

import { AuthContext } from '../auth/AuthenticationContext'

import LogoWhite from '../assets/img/logo-white.png'
import Welcome from '../assets/img/welcome.svg'
import bg from '../assets/img/bg.jpg'

type SignInProps = {
  navigation: any
}

export default function SignIn({ navigation }: SignInProps) {
  const { top } = useSafeAreaInsets()
  const { signIn } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  /** Fake authentication */
  function handleSignIn() {
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
    <View className="flex-1">
      <Spinner
        visible={isLoading}
        textContent="Aguarde..."
        textStyle={{ color: '#fff', fontFamily: 'Baloo2_400Regular' }}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.5)"
      />

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={16}
        className="flex-1 bg-zinc-100"
      >
        <ImageBackground className="flex-1" source={bg} resizeMode="cover">
          <StatusBar style="light" translucent />

          <View
            className="items-center justify-center"
            style={{ marginTop: top + 12 }}
          >
            <Image
              source={LogoWhite}
              alt="Receita Que Dói Menos Logo"
              style={{ width: 122, height: 100 }}
            />
          </View>

          <View className="ml-4 mt-40 flex-1">
            <Welcome />
          </View>

          <View className="mt-3 flex-1 flex-col rounded-t-[38px] bg-zinc-100 px-8 py-6">
            <Text className="font-title text-lg leading-relaxed text-zinc-900">
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

            <TouchableOpacity
              activeOpacity={0.7}
              className="mt-4 w-full items-center justify-center bg-success p-3"
              style={{
                borderRadius: 20,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
              }}
              onPress={() => handleSignIn()}
            >
              <Text className="font-title text-lg text-white">Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className="mt-4 w-full"
              onPress={() => navigation.navigate('Register')}
            >
              <Text className="text-center font-body text-base text-zinc-900">
                Ainda dói e você não Receita?
              </Text>
              <Text className="-mt-1 text-center font-title text-base text-zinc-900">
                Faça sua conta!
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </View>
  )
}
