import * as React from 'react'

type AuthContextType = {
  signIn: (data: { email: string; password: string }) => Promise<void>
  signOut: () => void
  signUp: (data: { email: string; password: string }) => Promise<void>
}

export const AuthContext = React.createContext<AuthContextType>()
