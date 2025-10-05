import type { Metadata } from 'next'
import { Inter, Literata, Source_Sans_3 } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import './globals.css'
import { SessionProvider } from '@/components/SessionProvider'
import { getCurrentUser } from '@/lib/session'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-serif',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A modern blog built with Next.js and Supabase',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return (
    <html lang="en">
      <body className={`${inter.variable} ${literata.variable} ${sourceSans.variable} font-sans min-h-screen bg-background`}>
       {!user?.id && <Navbar />}
        <main className="flex-1">
          <SessionProvider>
          {children}
        </SessionProvider>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with Next.js, Supabase, and shadcn/ui
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}