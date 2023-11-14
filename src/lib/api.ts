import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://receita-que-doi-menos-server.up.railway.app/',
})
