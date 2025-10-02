import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { BlogPost } from '@/types/blog'

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-serif font-semibold hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-body font-body line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-sm font-medium hover:underline"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  )
}