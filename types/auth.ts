export interface User {
  id: string
  email?: string
  user_metadata?: {
    username?: string
    [key: string]: string | undefined
  }
}

export interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<{
    success: boolean
    user?: User
    error?: string
  }>
  signOut: () => Promise<void>
  loading: boolean
}

export interface Session {
  user: User
  access_token: string
  expires_at?: number
}