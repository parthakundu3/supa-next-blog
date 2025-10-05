import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { BlogPost } from '@/types/blog'
import { Calendar, User, Clock, ArrowRight, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  // Format date to relative time or readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Estimate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-200">
      {/* Cover Image */}
      {post.cover_image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant={post.published ? "default" : "secondary"}
              className={`
                ${post.published 
                  ? "bg-green-500 hover:bg-green-600" 
                  : "bg-gray-500 hover:bg-gray-600"
                } text-white border-0
              `}
            >
              {post.published ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className="p-6 pb-4">
        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="group/title">
          <h3 className="text-xl font-bold text-gray-900 group-hover/title:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 mt-3 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </CardHeader>

      <CardContent className="p-6 pt-0">
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {/* Author */}
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-700">
              {post.profiles?.full_name || post.profiles?.username || 'Unknown Author'}
            </span>
          </div>

          {/* Reading Time */}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{getReadingTime(post.content)}</span>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(post.created_at)}</span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link 
          href={`/blog/${post.slug}`}
          className="group/link inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          <span>Read more</span>
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </CardFooter>
    </Card>
  )
}