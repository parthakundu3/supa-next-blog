'use client'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import BlogPostForm from '@/components/BlogPostForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreatePostPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/admin/posts')
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/posts"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Posts</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Post
          </h1>
          <p className="text-gray-600">
            Write and publish a new blog post
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <BlogPostForm onSuccess={handleSuccess} />
        </div>
      </div>
    </AdminLayout>
  )
}