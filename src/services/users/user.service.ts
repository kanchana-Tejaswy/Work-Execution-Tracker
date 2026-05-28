import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  const isDemo = cookies().get('wet_demo')?.value === 'true'
  
  if (isDemo) {
    return {
      id: 'demo-user-id',
      email: 'demo@wet.enterprise',
      profile: {
        id: 'demo-user-id',
        full_name: 'Guest User',
        role: 'manager',
        avatar_url: null,
        is_demo: true
      }
    }
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching current user profile:', error)
    return null
  }

  return { ...user, profile }
}

export async function getAllUsers() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, email, role, avatar_url')
    .order('full_name')

  if (error) {
    console.error('Error fetching users:', error)
    return []
  }

  return data
}

export async function updateUserRole(userId: string, role: 'admin' | 'manager' | 'freelancer') {
  const supabase = createClient()
  const { error } = await supabase
    .from('users')
    .update({ role })
    .eq('id', userId)

  if (error) {
    console.error('Error updating user role:', error)
    throw error
  }
}
