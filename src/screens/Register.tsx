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
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Toast from 'react-native-toast-message'
import Ionicons from '@expo/vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay'
import * as SecureStore from 'expo-secure-store'

import { SecureStoreKeys } from '../utils/enums/secure-store-keys'
import { AuthContext } from '../auth/AuthenticationContext'
import { publicApi } from '../lib/api'

import LogoMixed from '../assets/img/logo-red-yellow.png'

type RegisterProps = {
  navigation: any
}

export default function Register({ navigation }: RegisterProps) {
  const { signIn } = useContext(AuthContext)

  const registerSchema = z.object({
    name: z
      .string()
      .min(1, 'O seu nome é obrigatório')
      .min(3, 'Seu nome deve ter no mínimo 3 caracteres'),
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'A senha deve conter no mínimo 8 caracteres')
      .max(12, 'A senha não pode ter mais de 12 caracteres'),
  })
  type Register = z.infer<typeof registerSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * Registrar usuário na aplicação e fazer login
   *
   * @author Darllinson Azevedo
   *
   * @param data Payload com os dados do formulário
   */
  function handleRegister(data: Register) {
    setIsLoading(true)

    publicApi
      .post('/auth/register', data)
      .then(() => {
        publicApi
          .post('/auth/login', { email: data.email, password: data.password })
          .then(async (response) => {
            await SecureStore.setItemAsync(
              SecureStoreKeys.TOKEN,
              response.data.access_token,
            )
            await SecureStore.setItemAsync(
              SecureStoreKeys.TOKEN,
              response.data.refresh_token,
            )

            setIsLoading(false)

            setTimeout(() => {
              signIn(response.data.access_token)
            }, 500)
          })
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
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                className="mt-1 w-full rounded-full border border-zinc-900 px-4 py-3 font-body text-base text-zinc-900"
                placeholder="Receita Que Dói Menos da Silva"
                placeholderTextColor="#131313"
                returnKeyType="next"
                keyboardAppearance="default"
                autoComplete="name"
                enterKeyHint="next"
                cursorColor="#131313"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
              />
            )}
          />
          {errors.name && (
            <Text className="mt-2 font-body text-sm text-danger">
              {errors.name.message}
            </Text>
          )}

          {/* Email */}
          <Text className="mt-4 font-title text-lg leading-relaxed text-zinc-900">
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

          {/* Password */}
          <Text className="mt-4 font-title text-lg leading-relaxed text-zinc-900">
            Digite sua senha
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextInput
                className="mt-1 w-full rounded-full border border-zinc-900 px-4 py-3 font-body text-base text-zinc-900"
                placeholder="com pelo menos 8 caracteres"
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
          onPress={handleSubmit(handleRegister)}
        >
          <Text className="font-title text-lg text-white">Criar conta</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Toast />
    </SafeAreaView>
  )
}
