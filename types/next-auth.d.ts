import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
    }
    accessToken?: string
  }

  interface User {
    id: string
    email: string
    name?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    id: string
  }
}