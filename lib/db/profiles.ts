import { supabase } from '@/lib/supabase'
import { Profile } from '@/types/blog'

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return profile
  } catch (error) {
    console.error('Error in getProfile:', error)
    return null
  }
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      return { data: null, error }
    }

    return { data: profile, error: null }
  } catch (error) {
    console.error('Error in updateProfile:', error)
    return { data: null, error }
  }
}