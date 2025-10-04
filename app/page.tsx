import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogPostCard } from "@/components/blog-post-card"
import { getPosts } from "@/lib/db/posts"
import { Hero } from "@/components/Hero"

export default async function Home() {
  const recentPosts = await getPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      {/* Client-side animated Hero */}
      <Hero />

      {/* Recent Posts Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
            Recent Posts
          </h2>
          <Button
            variant="outline"
            asChild
            className="border-white text-white hover:bg-white hover:text-purple-700 rounded-xl"
          >
            <Link href="/blog">View All</Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.length > 0 ? (
            recentPosts.slice(0, 3).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-300 text-lg">No posts yet. Check back soon! 🚀</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
