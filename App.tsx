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

import { Header } from './src/components/Header'

import { AuthContext } from './src/auth/AuthenticationContext'

import SignIn from './src/screens/SignIn'
import Home from './src/screens/Home'
import Register from './src/screens/Register'

const Stack = createNativeStackNavigator()

export default function App() {
  const [hasLoadedFonts, hasErrorOnLoadFonts] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
    MouseMemoirs_400Regular,
  })

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
      signIn: async (data: { email: string; password: string }) => {
        console.log(data)
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: { email: string; password: string }) => {
        console.log(data)
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
      },
    }),
    [],
  )

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null

      userToken = await SecureStore.getItemAsync(SecureStoreKeys.TOKEN)
      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }

    bootstrapAsync()
  }, [])

  if (!hasLoadedFonts && !hasErrorOnLoadFonts) {
    return null
  }

  return (
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
                options={{ header: () => <Header /> }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
