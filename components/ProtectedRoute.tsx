import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default async function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return <>{children}</>
}