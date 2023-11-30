/* eslint-disable no-useless-return */
import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Ionicons from '@expo/vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store'

import { RegisterRecipe } from '../utils/types/register-recipe'
import { JwtDecode } from '../utils/types/jwt'

import Background from '../assets/img/bg-register.png'
import { SecureStoreKeys } from '../utils/enums/secure-store-keys'
import { jwtDecode } from '../utils/functions/jwt-decode'
import { privateApi } from '../lib/api'

type PublicRecipeProps = {
  navigation: any
}

export default function PublicRecipe({ navigation }: PublicRecipeProps) {
  const { top } = useSafeAreaInsets()

  const [ingredients, setIngredients] = useState<string[]>([])
  const [userInfo, setUserInfo] = useState<JwtDecode | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const registerRecipeSchema = z.object({
    name: z
      .string()
      .min(1, 'O nome da receita é obrigatório.')
      .min(3, 'O nome da receita deve ter no mínimo 3 caracteres.'),
    photoURL: z
      .string()
      .min(1, 'A URL da foto é obrigatória.')
      .url('URL inválida.'),
    videoURL: z.string(),
    instructions: z
      .string()
      .min(20, 'As instruções devem possuir pelo menos 20 caracteres.'),
  })
  type RegisterRecipeForm = z.infer<typeof registerRecipeSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterRecipeForm>({
    resolver: zodResolver(registerRecipeSchema),
    defaultValues: {
      name: '',
      instructions: '',
      photoURL: '',
      videoURL: '',
    },
  })

  const handleOpenImgBb = useCallback(async () => {
    const URL = 'https://imgbb.com'
    const supported = await Linking.canOpenURL(URL)

    if (supported) {
      await Linking.openURL(URL)
    } else {
      Alert.alert(
        `Não foi possível acessar a url: ${URL}, contate os administradores do Receita!`,
      )
    }
  }, [])

  function updateIngredient(index: number, value: string) {
    const ingredientsList = [...ingredients]
    ingredientsList[index] = value

    setIngredients(ingredientsList)
  }

  function deleteIngredient(index: number) {
    const ingredientsList = [...ingredients]
    ingredientsList.splice(index, 1)

    setIngredients(ingredientsList)
  }

  function showToast() {
    Toast.show({
      type: 'success',
      text1: 'Sua receita foi publicada com sucesso! 😍',
      visibilityTime: 3000,
      position: 'bottom',
    })
  }

  /**
   * Publicar receita na aplicação
   *
   * @author Darllinson Azevedo
   *
   * @param data Payload com os dados do formulário
   */
  function handlePublishRecipe(data: RegisterRecipeForm) {
    setIsLoading(true)

    /** Verificando se a lista de ingredientes está vazia */
    if (!ingredients.length) {
      setIsLoading(false)
      Alert.alert(
        'Calma aí chef 🧑‍🍳! Coloque pelo menos um ingrediente para a sua receita.',
      )

      return
    }

    /** Percorrendo a lista de ingredientes e verificando se algum está vazio */
    for (let index = 0; index < ingredients.length; index++) {
      const ingredient = ingredients[index]
      if (!ingredient.trim()) {
        setIsLoading(false)
        Alert.alert('Opa opa... 🕵️. Algum ingrediente cadastrado está vazio.')

        return
      }
    }

    const payload: RegisterRecipe = {
      name: data.name.trim(),
      ingredients,
      instructions: data.instructions.trim(),
      photoURL: data.photoURL || null,
      videoURL: data.videoURL || null,
      typeMeal: null,
      creatorID: userInfo?.user_id || '',
    }

    privateApi
      .post('/meals', payload)
      .then(() => {
        setIsLoading(false)
        showToast()
        reset()
        setIngredients([])
      })
      .catch((err) => {
        setIsLoading(false)
        console.log('Erro ao publicar receita: ' + err.message)
      })
  }

  useEffect(() => {
    /** Recuperando informações do usuário autenticado */
    SecureStore.getItemAsync(SecureStoreKeys.TOKEN).then((token) => {
      const decodedToken = jwtDecode(token || '')
      setUserInfo(decodedToken)
    })
  }, [])

  return (
    <>
      <ScrollView className="flex-1 bg-zinc-50">
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
          className="flex-1 bg-primary"
        >
          <View
            className="h-fit w-full items-center justify-center rounded-b-2xl bg-zinc-300 px-4 pb-4"
            style={{ paddingTop: top }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              className="absolute left-4 top-12 h-10 w-10 items-center justify-center rounded-full bg-zinc-950/40"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleOpenImgBb}
              className="mt-10 w-[80%] items-center justify-center rounded-xl border-2 border-dashed border-zinc-500  p-4"
            >
              <Ionicons name="camera-outline" size={48} color="#636363" />
              <Text className="font-title text-xl text-zinc-500">
                Olha o click!
              </Text>
              <Text className="text-center font-body text-sm leading-[0.2] text-zinc-500">
                Receitas com fotos são bem mais avaliadas por nossos Chefs!
                Capricha no retrato, faça upload no{' '}
                <Text className="font-title">imgbb.com</Text> e coloque o link
                da sua obra de arte aqui 😎
              </Text>

              <Controller
                control={control}
                name="photoURL"
                render={({ field }) => (
                  <TextInput
                    className="mt-2 w-full rounded-full bg-zinc-50 px-4 py-3 font-body text-base text-zinc-900"
                    placeholder="Coloque aqui a URL da sua foto"
                    placeholderTextColor="#131313"
                    returnKeyType="send"
                    enterKeyHint="send"
                    keyboardAppearance="default"
                    cursorColor="#131313"
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                  />
                )}
              />
              {errors.photoURL && (
                <Text className="mt-2 font-body text-sm text-danger">
                  {errors.photoURL.message}
                </Text>
              )}
            </TouchableOpacity>

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  className="mt-4 w-full rounded-full bg-zinc-50 px-4 py-3 font-body text-base text-zinc-900"
                  placeholder="Digite o nome da receita"
                  placeholderTextColor="#131313"
                  returnKeyType="send"
                  enterKeyHint="send"
                  keyboardAppearance="default"
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
          </View>
          <ImageBackground
            source={Background}
            resizeMode="cover"
            className="w-full flex-1"
          >
            <View className="w-full items-start p-4">
              <View className="w-full flex-col">
                <Text className="font-mouse text-3xl">Instruções</Text>

                <Controller
                  control={control}
                  name="instructions"
                  render={({ field }) => (
                    <TextInput
                      className="mt-4 h-36 w-full rounded-xl bg-zinc-200 px-4 py-3 font-body text-base text-zinc-500"
                      placeholder="Capriche nas instruções para a receita! Recomendamos que seja em formato de tópicos."
                      placeholderTextColor="#4F4F4F"
                      keyboardAppearance="default"
                      cursorColor="#4F4F4F"
                      multiline
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                  )}
                />
                {errors.instructions && (
                  <Text className="mt-2 font-body text-sm text-danger">
                    {errors.instructions.message}
                  </Text>
                )}
              </View>

              <View className="mt-4 w-full flex-col">
                <Text className="font-mouse text-3xl">Ingredientes</Text>

                <View className="mt-4 w-full items-center justify-center rounded-xl bg-zinc-200 p-4">
                  {ingredients.length ? (
                    ingredients.map((ingredient, index) => (
                      <View
                        key={index}
                        className="mb-2 w-full flex-row rounded-full bg-zinc-50 px-4 py-3"
                      >
                        <TextInput
                          className="flex-1 font-body text-base text-zinc-900"
                          placeholder="qtd. - und. - descrição"
                          placeholderTextColor="#4F4F4F"
                          keyboardAppearance="default"
                          cursorColor="#4F4F4F"
                          value={ingredient}
                          onChangeText={(value) => {
                            updateIngredient(index, value)
                          }}
                        />

                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => deleteIngredient(index)}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={22}
                            color="#DE0000"
                          />
                        </TouchableOpacity>
                      </View>
                    ))
                  ) : (
                    <Text className="font-body text-base text-zinc-900">
                      Chegou a hora de adicionarmos os ingredientes da receita,
                      pressione o botão abaixo ⬇ e comece a diversão! 😋
                    </Text>
                  )}

                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="mt-2 h-10 w-10 items-center justify-center rounded-full bg-zinc-400"
                    onPress={() => setIngredients([...ingredients, ''])}
                  >
                    <Ionicons name="add-outline" size={22} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mt-4 w-full flex-col">
                <Text className="font-mouse text-3xl">
                  Link para vídeo (opcional)
                </Text>

                <View className="mt-4 w-full rounded-xl bg-zinc-200 p-4">
                  <Controller
                    control={control}
                    name="videoURL"
                    render={({ field }) => (
                      <TextInput
                        className="w-full rounded-full bg-zinc-50 px-4 py-3 font-body text-base text-zinc-900"
                        placeholder="Adicione o link do vídeo aqui"
                        placeholderTextColor="#4F4F4F"
                        returnKeyType="send"
                        enterKeyHint="send"
                        keyboardAppearance="default"
                        cursorColor="#4F4F4F"
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                      />
                    )}
                  />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                className="mb-4 mt-8 w-full items-center justify-center bg-success p-3"
                style={{
                  borderRadius: 20,
                  borderTopRightRadius: 40,
                  borderBottomLeftRadius: 40,
                }}
                onPress={handleSubmit(handlePublishRecipe)}
              >
                <Text className="font-title text-lg text-white">Publicar</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </ScrollView>

      <Toast />
    </>
  )
}
