import { createClient } from '@/lib/supabase/server'

export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    // Return user with null profile if record doesn't exist yet
    return { ...user, profile: null }
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
