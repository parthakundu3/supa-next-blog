'use client'
import { signOut } from 'next-auth/react'

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
    >
      Sign Out
    </button>
  )
}