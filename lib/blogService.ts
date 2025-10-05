import { supabase } from './supabase'
import { BlogPost, CreatePostDTO } from '@/types/blog'

export class BlogService {
  // Get all blog posts with author profiles
  static async getPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles (*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error in getPosts:', error)
      throw new Error(`Failed to fetch posts: ${error.message}`)
    }

    return data || []
  }

  // Get single post by ID with author profile
  static async getPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles (*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase error in getPostById:', error)
      throw new Error(`Failed to fetch post: ${error.message}`)
    }

    return data
  }

  // Generate slug from title
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  // Create new post
  static async createPost(postData: CreatePostDTO & { author_id: string }): Promise<BlogPost> {
    console.log('Creating post with data:', postData) // Debug log
    
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select(`
        *,
        profiles (*)
      `)
      .single()

    if (error) {
      console.error('Supabase error in createPost:', error)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      throw new Error(`Failed to create post: ${error.message}`)
    }

    if (!data) {
      throw new Error('No data returned after post creation')
    }

    return data
  }

  // Update post
  static async updatePost(id: string, postData: Partial<CreatePostDTO>): Promise<BlogPost> {
    console.log('Updating post with data:', postData) // Debug log

    const updates: Partial<CreatePostDTO> & { updated_at: string } = {
      ...postData,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        profiles (*)
      `)
      .single()

    if (error) {
      console.error('Supabase error in updatePost:', error)
      throw new Error(`Failed to update post: ${error.message}`)
    }

    if (!data) {
      throw new Error('No data returned after post update')
    }

    return data
  }

  // Delete post
  static async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error in deletePost:', error)
      throw new Error(`Failed to delete post: ${error.message}`)
    }
  }
}