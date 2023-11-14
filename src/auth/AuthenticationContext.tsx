import * as React from 'react'

type AuthContextType = {
  signIn: (token: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = React.createContext<AuthContextType>()
