'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Edit,
  FolderOpen,
  Tag,
  Menu,
  X,
  Plus
} from 'lucide-react'

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: '/admin'
  },
  {
    id: 'posts',
    label: 'All Posts',
    icon: <FileText className="w-5 h-5" />,
    href: '/admin/posts'
  },
  {
    id: 'create-post',
    label: 'Create Post',
    icon: <Plus className="w-5 h-5" />,
    href: '/admin/posts/create'
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: <FolderOpen className="w-5 h-5" />,
    href: '/admin/categories'
  },
  {
    id: 'tags',
    label: 'Tags',
    icon: <Tag className="w-5 h-5" />,
    href: '/admin/tags'
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gradient-to-b from-gray-900 to-gray-800
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Admin</span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-opacity-10 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-opacity-5 hover:text-white'
                    }
                  `}
                >
                  <div className={`
                    transition-colors duration-200
                    ${isActive ? 'text-purple-300' : 'text-gray-400 group-hover:text-purple-300'}
                  `}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-gray-400 text-center">
                Admin Panel v1.0
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}