'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithGoogle() {
  const supabase = createClient()
  const origin = headers().get('origin')
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Google Auth Error:', error)
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  if (data.url) {
    return redirect(data.url)
  }
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

export async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}
