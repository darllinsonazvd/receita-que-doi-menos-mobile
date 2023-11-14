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
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Spinner from 'react-native-loading-spinner-overlay'
import * as SecureStore from 'expo-secure-store'
import Toast from 'react-native-toast-message'

import { SecureStoreKeys } from '../utils/enums/secure-store-keys'
import { AuthContext } from '../auth/AuthenticationContext'
import { api } from '../lib/api'

import LogoWhite from '../assets/img/logo-white.png'
import Welcome from '../assets/img/welcome.svg'
import bg from '../assets/img/bg.jpg'

type SignInProps = {
  navigation: any
}

export default function SignIn({ navigation }: SignInProps) {
  const { top } = useSafeAreaInsets()

  const authSchema = z.object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'A senha deve conter no mínimo 8 caracteres')
      .max(12, 'A senha não pode ter mais de 12 caracteres'),
  })
  type Auth = z.infer<typeof authSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { signIn } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * Fazer login do usuário
   *
   * @author Darllinson Azevedo
   *
   * @param data Payload com os dados do formulário
   */
  function handleSignIn(data: Auth) {
    setIsLoading(true)

    api
      .post('/auth/login', data)
      .then(async (response) => {
        await SecureStore.setItemAsync(
          SecureStoreKeys.TOKEN,
          response.data.access_token,
        )
        await SecureStore.setItemAsync(
          SecureStoreKeys.REFRESH_TOKEN,
          response.data.refresh_token,
        )

        setIsLoading(false)

        setTimeout(() => {
          signIn(response.data.access_token)
        }, 500)
      })
      .catch(() => {
        setIsLoading(false)

        Toast.show({
          type: 'error',
          text1: 'Ooops...',
          text2: 'Usuário ou senha incorretas.',
          visibilityTime: 3000,
          position: 'bottom',
        })
      })
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
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextInput
                  className="mt-1 w-full rounded-full border border-zinc-900 px-4 py-3 font-body text-base text-zinc-900"
                  placeholder="seumail@exemplo.com"
                  placeholderTextColor="#131313"
                  returnKeyType="next"
                  keyboardAppearance="default"
                  autoComplete="email"
                  enterKeyHint="next"
                  cursorColor="#131313"
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                />
              )}
            />
            {errors.email && (
              <Text className="mt-2 font-body text-sm text-danger">
                {errors.email.message}
              </Text>
            )}

            <Text className="mt-4 font-title text-lg leading-relaxed text-zinc-900">
              Digite sua senha
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextInput
                  className="mt-1 w-full rounded-full border border-zinc-900 px-4 py-3 font-body text-base text-zinc-900"
                  placeholder="com pelo menos 6 caracteres"
                  placeholderTextColor="#131313"
                  keyboardAppearance="default"
                  secureTextEntry
                  cursorColor="#131313"
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                />
              )}
            />
            {errors.password && (
              <Text className="mt-2 font-body text-sm text-danger">
                {errors.password.message}
              </Text>
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              className="mt-4 w-full items-center justify-center bg-success p-3"
              style={{
                borderRadius: 20,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
              }}
              onPress={handleSubmit(handleSignIn)}
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

      <Toast />
    </View>
  )
}
