import { supabase } from '@/lib/supabase'
import { BlogPost, CreatePostDTO } from '@/types/blog'

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
      return []
    }

    return posts || []
  } catch (error) {
    console.error('Error in getPosts:', error)
    return []
  }
}



export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Error fetching post:', error)
      return null
    }

    return post
  } catch (error) {
    console.error('Error in getPostBySlug:', error)
    return null
  }
}

export async function createPost(postData: CreatePostDTO & { author_id: string }) {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
      return { data: null, error }
    }

    return { data: post, error: null }
  } catch (error) {
    console.error('Error in createPost:', error)
    return { data: null, error }
  }
}