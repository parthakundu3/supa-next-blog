-- Insert sample profile (replace with your actual user ID)
INSERT INTO profiles (id, username, full_name, avatar_url, bio)
VALUES (
  'b7de00a3-c2ad-4539-8394-9536f9548866',
  'admin',
  'Blog Admin',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'I love writing about technology and web development.'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample posts
INSERT INTO posts (title, content, excerpt, slug, cover_image, published, author_id)
VALUES 
(
  'Getting Started with Next.js',
  'Next.js is a React framework that enables server-side rendering and static site generation. It provides a great developer experience with features like fast refresh, TypeScript support, and an intuitive page-based routing system.

In this post, we will explore the core concepts of Next.js and learn how to build modern web applications with it.

## Key Features

- Server-side rendering
- Static site generation
- API routes
- File-based routing
- Built-in CSS support

Next.js makes it easy to create production-ready React applications with minimal configuration.',
  'Learn the basics of Next.js and how to build modern web applications with this powerful React framework.',
  'getting-started-with-nextjs',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  true,
  'b7de00a3-c2ad-4539-8394-9536f9548866'
),
(
  'Introduction to Supabase',
  'Supabase is an open-source Firebase alternative that provides a PostgreSQL database, authentication, real-time subscriptions, and storage.

## Why Supabase?

- Built on PostgreSQL
- Real-time functionality
- Row Level Security
- Auto-generated APIs
- Great developer experience

Supabase makes it easy to build secure and scalable applications without managing infrastructure.',
  'Discover how Supabase can help you build backend features quickly with its powerful suite of tools.',
  'introduction-to-supabase',
  'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
  true,
  'b7de00a3-c2ad-4539-8394-9536f9548866'
);