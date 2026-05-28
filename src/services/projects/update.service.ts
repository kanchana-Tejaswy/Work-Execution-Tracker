import { createClient } from '@/lib/supabase/server'
import { logActivity } from '../activity/activity.service'
import { cookies } from 'next/headers'

export interface SubmitUpdateData {
  projectId: string
  updateText: string
  progressPercentage?: number
  attachmentUrl?: string
}

export async function submitUpdate(data: SubmitUpdateData) {
  const isDemo = cookies().get('wet_demo')?.value === 'true'
  if (isDemo) {
    return { id: 'demo-new-update', ...data, created_at: new Date().toISOString() }
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { data: update, error } = await supabase
    .from('project_updates')
    .insert({
      project_id: data.projectId,
      user_id: user.id,
      update_text: data.updateText,
      progress_percentage: data.progressPercentage,
      attachment_url: data.attachmentUrl
    })
    .select()
    .single()

  if (error) {
    console.error('Error submitting project update:', error)
    throw error
  }

  // Log activity
  await logActivity(data.projectId, user.id, 'UPDATE_SUBMITTED', { 
    progress: data.progressPercentage,
    updateId: update.id 
  })

  return update
}

export async function getProjectUpdates(projectId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('project_updates')
    .select('*, users(full_name, avatar_url)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching project updates:', error)
    return []
  }

  return data
}
