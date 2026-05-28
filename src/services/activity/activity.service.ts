import { createClient } from '@/lib/supabase/server'

export type ActivityType = 
  | 'PROJECT_CREATED' 
  | 'MEMBER_ADDED' 
  | 'UPDATE_SUBMITTED' 
  | 'STATUS_CHANGED'

export async function logActivity(
  projectId: string, 
  userId: string, 
  activityType: ActivityType, 
  metadata: Record<string, any> = {}
) {
  const supabase = createClient()

  const { error } = await supabase.from('activity_logs').insert({
    project_id: projectId,
    user_id: userId,
    activity_type: activityType,
    metadata: metadata
  })

  if (error) {
    console.error('Error logging activity:', error)
  }
}

export async function getActivityLogs(projectId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('activity_logs')
    .select('*, users(full_name, avatar_url)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching activity logs:', error)
    return []
  }

  return data
}
