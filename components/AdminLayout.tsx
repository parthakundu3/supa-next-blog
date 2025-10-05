import { ReactNode } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar />
        
        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <AdminHeader />
          
          <main className="p-6 animate-in fade-in duration-500">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}