'use client'
import { Toaster } from 'sonner'

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#fff',
          color: '#374151',
          border: '1px solid #e5e7eb',
        },
      }}
    />
  )
}