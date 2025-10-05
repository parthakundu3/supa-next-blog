'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BlogPost, BlogPostFormData } from '@/types/blog'
import { BlogService } from '@/lib/blogService'
import { toast } from 'sonner'
import { Loader2, Image, Eye, EyeOff } from 'lucide-react'

interface BlogPostFormProps {
  post?: BlogPost
  onSuccess?: () => void
  isEditing?: boolean
}

export default function BlogPostForm({ post, onSuccess, isEditing = false }: BlogPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(post?.cover_image || '')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BlogPostFormData>({
    defaultValues: post ? {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      cover_image: post.cover_image || '',
      published: post.published
    } : {
      title: '',
      content: '',
      excerpt: '',
      cover_image: '',
      published: false
    }
  })

  const watchedImage = watch('cover_image')

 const onSubmit = async (data: BlogPostFormData) => {
  setIsSubmitting(true)
  try {
    const slug = BlogService.generateSlug(data.title)

    const postData = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || undefined,
      slug,
      cover_image: data.cover_image || undefined,
      published: data.published
    }

    console.log('Submitting post data:', postData) // Debug log

    if (isEditing && post) {
      const result = await BlogService.updatePost(post.id, postData)
      console.log('Update result:', result) // Debug log
      toast.success('Post updated successfully!')
    } else {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData) // Debug log
        throw new Error(errorData.error || 'Failed to create post')
      }
      
      const result = await response.json()
      console.log('Create result:', result) // Debug log
      toast.success('Post created successfully!')
    }

    onSuccess?.()
  } catch (error) {
    console.error('Error saving post:', error)
    toast.error(error instanceof Error ? error.message : 'Failed to save post. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue('cover_image', value)
    setImagePreview(value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          rows={3}
          {...register('excerpt')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Brief description of your post (optional)"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content *
        </label>
        <textarea
          id="content"
          rows={12}
          {...register('content', { required: 'Content is required' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
          placeholder="Write your post content here..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      {/* Cover Image */}
      <div>
        <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image URL
        </label>
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="url"
              id="cover_image"
              {...register('cover_image')}
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {imagePreview && (
            <button
              type="button"
              onClick={() => setImagePreview('')}
              className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <EyeOff className="w-4 h-4" />
              <span>Hide</span>
            </button>
          )}
        </div>
        
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="Cover image preview"
                className="w-full h-full object-cover"
                onError={() => setImagePreview('')}
              />
            </div>
          </div>
        )}
      </div>

      {/* Publish Toggle */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="published"
          {...register('published')}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="published" className="text-sm font-medium text-gray-700">
          Publish immediately
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex space-x-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Image className="w-4 h-4" />
          )}
          <span>
            {isSubmitting 
              ? (isEditing ? 'Updating...' : 'Creating...') 
              : (isEditing ? 'Update Post' : 'Create Post')
            }
          </span>
        </button>

        <button
          type="button"
          onClick={onSuccess}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}