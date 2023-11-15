import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import { SecureStoreKeys } from '../utils/enums/secure-store-keys'
import { jwtDecode } from '../utils/functions/jwt-decode'
import { verifyTokenExpirationTime } from '../utils/functions/jwt-verify'

/** URL para consultas que **não necessitam** autenticação */
export const publicApi = axios.create({
  baseURL: 'https://receita-que-doi-menos-server.up.railway.app',
})

/** URL para consultas que **necessitam** autenticação */
export const privateApi = axios.create({
  baseURL: 'https://receita-que-doi-menos-server.up.railway.app',
})

privateApi.interceptors.request.use(
  async (config) => {
    let token = await SecureStore.getItemAsync(SecureStoreKeys.TOKEN)
    const refreshToken = await SecureStore.getItemAsync(
      SecureStoreKeys.REFRESH_TOKEN,
    )
    const decodedToken = jwtDecode(token || '')
    const tokenExpirationTime = verifyTokenExpirationTime(decodedToken)

    /** Verificando se o token vai expirar em 5 minutos (300 seg.) */
    if (tokenExpirationTime <= 300) {
      privateApi
        .post(
          '/auth/refresh',
          { refresh_token: refreshToken },
          { headers: { Authorization: 'Bearer ' + token } },
        )
        .then(async (response) => {
          await SecureStore.setItemAsync(
            SecureStoreKeys.TOKEN,
            response.data['access-token'],
          )
          token = response.data['access-token']
        })
    }

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)
