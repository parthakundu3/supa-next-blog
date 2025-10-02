import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BlogPostCard } from '@/components/blog-post-card'
import { getPosts } from '@/lib/db/posts'

export default async function Home() {
  const recentPosts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-body">
          A modern blog built with Next.js, Supabase, and Tailwind CSS. 
          Share your thoughts and ideas with the world.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link href="/blog">Read Blog</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif font-bold">Recent Posts</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">View All</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.slice(0, 3).map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        {recentPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  )
}