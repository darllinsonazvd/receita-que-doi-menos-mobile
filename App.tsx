import * as React from 'react'
import {
  useFonts,
  Baloo2_400Regular,
  Baloo2_700Bold,
} from '@expo-google-fonts/baloo-2'
import { MouseMemoirs_400Regular } from '@expo-google-fonts/mouse-memoirs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store'

import { SecureStoreKeys } from './src/utils/enums/secure-store-keys'

import { AuthContext } from './src/auth/AuthenticationContext'

import SignIn from './src/screens/SignIn'
import Home from './src/screens/Home'
import Register from './src/screens/Register'
import RecipeDetails from './src/screens/RecipeDetails'
import Profile from './src/screens/Profile'
import MyRecipes from './src/screens/MyRecipes'
import FavoritesRecipes from './src/screens/FavoritesRecipes'
import PublicRecipe from './src/screens/PublishRecipe'
import Splash from './src/screens/Splash'
import { jwtDecode } from './src/utils/functions/jwt-decode'
import { verifyTokenExpirationTime } from './src/utils/functions/jwt-verify'

const Stack = createNativeStackNavigator()

export default function App() {
  const [hasLoadedFonts, hasErrorOnLoadFonts] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
    MouseMemoirs_400Regular,
  })

  const [isReady, setIsReady] = React.useState<boolean>(false)

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  )

  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    [],
  )

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await SecureStore.getItemAsync(SecureStoreKeys.TOKEN)

      if (userToken) {
        const decodedToken = jwtDecode(userToken || '')
        const tokenExpirationTime = verifyTokenExpirationTime(decodedToken)

        /** Verificando se o token vai expirar em 5 minutos (300 seg.) */
        if (tokenExpirationTime <= 300) {
          await SecureStore.deleteItemAsync(SecureStoreKeys.TOKEN)
          await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN)
        }
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }

    setTimeout(async () => {
      setIsReady(true)
    }, 6000)

    bootstrapAsync()
  }, [])

  if (!hasLoadedFonts && !hasErrorOnLoadFonts) {
    return null
  }

  return isReady ? (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken === null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RecipeDetails"
                component={RecipeDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MyRecipes"
                component={MyRecipes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FavoritesRecipes"
                component={FavoritesRecipes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PublishRecipe"
                component={PublicRecipe}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  ) : (
    <Splash />
  )
}
