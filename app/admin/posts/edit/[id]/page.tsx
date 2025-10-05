'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import BlogPostForm from '@/components/BlogPostForm'
import { BlogPost } from '@/types/blog'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log('Fetching post with ID:', params.id) // Debug log
        
        const response = await fetch(`/api/admin/posts/${params.id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Post not found')
          }
          throw new Error(`Failed to fetch post: ${response.status}`)
        }
        
        const postData = await response.json()
        setPost(postData)
      } catch (error) {
        console.error('Error fetching post:', error)
        setError(error instanceof Error ? error.message : 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  const handleSuccess = () => {
    router.push('/admin/posts')
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    )
  }

  if (error || !post) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Post not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error ? 'There was an error loading the post' : 'The post you are looking for does not exist.'}
          </p>
          <Link
            href="/admin/posts"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Posts
          </Link>
        </div>
      </AdminLayout>
    )
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
            Edit Post
          </h1>
          <p className="text-gray-600">
            Update your blog post
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <BlogPostForm post={post} onSuccess={handleSuccess} isEditing={true} />
        </div>
      </div>
    </AdminLayout>
  )
}