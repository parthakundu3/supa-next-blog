export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string | null
  slug: string
  cover_image: string | null
  published: boolean
  author_id: string
  created_at: string
  updated_at: string
  profiles?: Profile
}

export interface CreatePostDTO {
  title: string
  content: string
  excerpt?: string
  slug: string
  cover_image?: string
  published?: boolean
}