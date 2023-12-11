import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as SecureStore from 'expo-secure-store'

import { AuthContext } from '../auth/AuthenticationContext'

import { SecureStoreKeys } from '../utils/enums/secure-store-keys'
import { JwtDecode } from '../utils/types/jwt'
import { jwtDecode } from '../utils/functions/jwt-decode'
import { privateApi } from '../lib/api'
import { decriptBase64ToURI, selectPhoto } from '../utils/functions/pick-photo'

import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-toast-message'

import BgRecipe from '../assets/img/bg-recipe.png'
import userDefaultPhoto from '../assets/img/profile-template.jpg'

type ProfileProps = {
  navigation: any
  name: string
  email: string
  profilePhoto: string
}

export default function Profile({ navigation }: ProfileProps) {
  const { top } = useSafeAreaInsets()

  const { signOut } = useContext(AuthContext)

  const [userInfo, setUserInfo] = useState<JwtDecode | null>(null)
  const [profilePhotoUri, setProfilePhotoUri] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * Desconectar usuário da aplicação
   *
   * @author Darllinson Azevedo
   */
  async function handleSignOut() {
    await SecureStore.deleteItemAsync(SecureStoreKeys.TOKEN)
    await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)

    signOut()
  }

  async function changePhoto() {
    const base64 = await selectPhoto()
    const fileuri = await decriptBase64ToURI(base64)
    const data = { base64photo: base64 }
    privateApi
      .put(`/user/profile/photo/${userInfo?.user_id}`, data)
      .then(() => {
        setProfilePhotoUri(fileuri)
        Toast.show({
          type: 'success',
          text1: `Foto definida com sucesso!`,
          visibilityTime: 3000,
          position: 'bottom',
        })
      })
  }

  function fetchUserData(userId: string) {
    setIsLoading(true)
    privateApi
      .get(`/user/info/${userId}`)
      .then((response) => {
        if (response.data.profilePhoto.trim().length > 0) {
          const profilePic = decriptBase64ToURI(response.data.profilePhoto)
          setProfilePhotoUri(profilePic)
        } else {
          setProfilePhotoUri('')
        }

        setIsLoading(false)
      })
      .catch((error) => {
        console.error('erro no fetch: ', error)
      })
  }

  useEffect(() => {
    /** Recuperando informações do usuário autenticado */
    SecureStore.getItemAsync(SecureStoreKeys.TOKEN).then((token) => {
      const decodedToken = jwtDecode(token || '')
      setUserInfo(decodedToken)
      fetchUserData(decodedToken.user_id)
    })
  }, [])

  return (
    <View className="flex-1 bg-zinc-100" style={{ paddingTop: top }}>
      <Spinner
        visible={isLoading}
        textContent="Aguarde..."
        textStyle={{ color: '#fff', fontFamily: 'Baloo2_400Regular' }}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
      <StatusBar style="dark" backgroundColor="transparent" />

      <View className="relative mt-4 items-center justify-center pb-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="absolute -top-0.5 left-4"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#191919" />
        </TouchableOpacity>
        <Text className="font-title text-2xl">Seu perfil</Text>
      </View>

      <ImageBackground source={BgRecipe} className="flex-1 p-4">
        <View className="w-full flex-col items-center rounded-2xl bg-zinc-100 p-4">
          <View className="relative h-24 w-24 items-center justify-center rounded-full border border-zinc-300">
            {profilePhotoUri ? (
              <Image
                source={{ uri: profilePhotoUri }}
                alt=""
                style={{ width: 90, height: 90, borderRadius: 50 }}
              />
            ) : (
              <Image
                source={userDefaultPhoto}
                alt=""
                style={{ width: 90, height: 90, borderRadius: 50 }}
              />
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              className="absolute bottom-0 right-0 "
              onPress={() => changePhoto()}
            >
              <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Ionicons name="pencil-outline" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-3 flex-col items-center justify-center">
            <Text className="font-title text-2xl">{userInfo?.user_name}</Text>
            <Text className="-mt-2 font-body text-base">{userInfo?.sub}</Text>
          </View>
        </View>

        <TouchableOpacity
          className="mt-4 w-full flex-row items-center rounded-2xl bg-zinc-100 p-4"
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MyRecipes')}
        >
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
              <Ionicons name="restaurant-outline" size={22} color="#FAC801" />
            </View>

            <Text className="ml-4 font-body text-xl">Minhas receitas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4 w-full flex-row items-center rounded-2xl bg-zinc-100 p-4"
          activeOpacity={0.7}
          onPress={() => navigation.navigate('FavoritesRecipes')}
        >
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
              <Ionicons name="heart-outline" size={22} color="#FAC801" />
            </View>

            <Text className="ml-4 font-body text-xl">Receitas favoritas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-4 w-full flex-row items-center justify-center bg-danger p-3"
          style={{
            borderRadius: 20,
            borderTopRightRadius: 40,
            borderBottomLeftRadius: 40,
          }}
          onPress={() => handleSignOut()}
        >
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text className="ml-1 font-title text-lg text-white">Sair</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}
