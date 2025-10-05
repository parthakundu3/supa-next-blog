"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  //const supabase = createClientComponentClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Get the session to ensure user is authenticated
        const session = await getSession()
        if (session) {
          router.push('/admin')
        } else {
          setError('Authentication failed')
        }
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }


  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* Card for login */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-[380px] backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-pink-400 text-sm font-medium">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-500 text-lg rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-gray-300 mt-6">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-pink-400 hover:text-pink-300"
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
