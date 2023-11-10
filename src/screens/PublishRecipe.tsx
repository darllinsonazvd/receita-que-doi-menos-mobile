/* eslint-disable prefer-const */
import { useCallback, useState } from 'react'
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
import Ionicons from '@expo/vector-icons/Ionicons'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-toast-message'

import Background from '../assets/img/bg-register.png'

type PublicRecipeProps = {
  navigation: any
}

export default function PublicRecipe({ navigation }: PublicRecipeProps) {
  const { top } = useSafeAreaInsets()

  const [preview, setPreview] = useState<string>('')
  const [ingredients, setIngredients] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState<boolean>()

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
    let ingredientsList = [...ingredients]
    ingredientsList[index] = value

    setIngredients(ingredientsList)
  }

  function deleteIngredient(index: number) {
    let ingredientsList = [...ingredients]
    ingredientsList.splice(index, 1)

    setIngredients(ingredientsList)
  }

  function showToast() {
    Toast.show({
      type: 'success',
      text1: 'Sua receita publicada com sucesso! 😍',
      visibilityTime: 3000,
      position: 'bottom',
    })
  }

  function handlePublishRecipe() {
    setIsLoading((prev) => !prev)

    setTimeout(() => {
      setIsLoading((prev) => !prev)
      showToast()
    }, 2000)
  }

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

              <TextInput
                className="mt-2 w-full rounded-full bg-zinc-50 px-4 py-3 font-body text-base text-zinc-900"
                placeholder="Coloque aqui a URL da sua foto"
                placeholderTextColor="#131313"
                returnKeyType="send"
                enterKeyHint="send"
                keyboardAppearance="default"
                cursorColor="#131313"
                value={preview}
                onChangeText={setPreview}
              />
            </TouchableOpacity>

            <TextInput
              className="mt-4 w-full rounded-full bg-zinc-50 px-4 py-3 font-body text-base text-zinc-900"
              placeholder="Digite o nome da receita"
              placeholderTextColor="#131313"
              returnKeyType="send"
              enterKeyHint="send"
              keyboardAppearance="default"
              cursorColor="#131313"
            />
          </View>
          <ImageBackground
            source={Background}
            resizeMode="cover"
            className="w-full flex-1"
          >
            <View className="w-full items-start p-4">
              <View className="w-full flex-col">
                <Text className="font-mouse text-3xl">Instruções</Text>

                <TextInput
                  className="mt-4 h-36 w-full rounded-xl bg-zinc-200 px-4 py-3 font-body text-base text-zinc-500"
                  placeholder="Capriche nas instruções para a receita! Recomendamos que seja em formato de tópicos."
                  placeholderTextColor="#4F4F4F"
                  keyboardAppearance="default"
                  cursorColor="#4F4F4F"
                  multiline
                />
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
                  <TextInput
                    className="w-full rounded-full bg-zinc-50 px-4 py-3 font-body text-base text-zinc-900"
                    placeholder="Adicione o link do vídeo aqui"
                    placeholderTextColor="#4F4F4F"
                    returnKeyType="send"
                    enterKeyHint="send"
                    keyboardAppearance="default"
                    cursorColor="#4F4F4F"
                    value={preview}
                    onChangeText={setPreview}
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
                onPress={handlePublishRecipe}
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
