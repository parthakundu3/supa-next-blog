import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/db/posts'

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      )}
      
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString()}
          </time>
          {post.profiles && (
            <span>By {post.profiles.full_name || post.profiles.username}</span>
          )}
        </div>
      </header>

      <div className="prose prose-lg max-w-none font-body">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}