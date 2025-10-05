import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { BlogService } from '@/lib/blogService'

// Handle GET request for single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Await the params to get the id
    const { id } = await params
    console.log('GET /api/admin/posts/[id] called with ID:', id)

    const post = await BlogService.getPostById(id)
    
    if (!post) {
      console.log('Post not found for ID:', id)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    console.log('Post found:', post.title)
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error in GET /api/admin/posts/[id]:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle PUT request to update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Await the params to get the id
    const { id } = await params
    const body = await request.json()
    console.log('PUT /api/admin/posts/[id] updating post:', id, 'with data:', body)

    const post = await BlogService.updatePost(id, body)
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error in PUT /api/admin/posts/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// Handle DELETE request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is now a Promise
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Await the params to get the id
    const { id } = await params
    console.log('DELETE /api/admin/posts/[id] deleting post:', id)

    await BlogService.deletePost(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/admin/posts/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}