"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="text-center py-28 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* Animated heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to My Blog
      </motion.h1>

      {/* Animated description */}
      <motion.p
        className="text-lg md:text-2xl text-gray-200 mt-6 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        A modern blog built with{" "}
        <span className="font-semibold text-pink-300">Next.js</span>,{" "}
        <span className="font-semibold text-purple-300">Supabase</span>, and{" "}
        <span className="font-semibold text-indigo-300">Tailwind CSS</span>. <br />
        Share your thoughts and ideas with the world.
      </motion.p>

      {/* Animated buttons */}
      <motion.div
        className="mt-10 flex justify-center space-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Button
          asChild
          size="lg"
          className="bg-pink-600 hover:bg-pink-500 text-lg px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          <Link href="/blog">📖 Read Blog</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          size="lg"
          className="border-2 text-lg px-6 text-purple-500 py-3 rounded-2xl hover:text-purple-800 hover:scale-105 shadow-lg"
        >
          <Link href="/about">✨ Learn More</Link>
        </Button>
      </motion.div>
    </section>
  )
}
