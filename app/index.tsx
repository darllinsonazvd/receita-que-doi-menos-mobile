import { StatusBar } from 'expo-status-bar'
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRouter } from 'expo-router'
import { styled } from 'nativewind'

import LogoTextAlt from '../src/assets/img/logo-text-alt.svg'
import bg from '../src/assets/img/bg.jpg'
import Welcome from '../src/assets/img/welcome.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const StyledLogo = styled(LogoTextAlt)

export default function App() {
  const router = useRouter()
  const { top } = useSafeAreaInsets()

  function handleSignIn() {
    router.push('/home')
  }

  return (
    <View className="flex-1">
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
            <StyledLogo />
          </View>

          <View className="ml-4 mt-48 flex-1">
            <Welcome />
          </View>

          <View className="mt-3 flex-1 flex-col rounded-t-[38px] bg-zinc-100 px-8 py-6">
            <Text className="font-title text-lg leading-relaxed">
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

            <Text className="mt-4 font-title text-lg leading-relaxed">
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
              className="mt-4 w-full items-center justify-center rounded-full bg-success p-3"
              onPress={() => handleSignIn()}
            >
              <Text className="font-title text-lg text-white">Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} className="mt-4 w-full">
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
