import { createClient } from '@/lib/supabase/server'

export type NotificationType = 'info' | 'attention' | 'high_priority' | 'critical'

export interface CreateNotificationData {
  userId: string
  projectId?: string
  title: string
  message: string
  type?: NotificationType
  metadata?: any
}

export async function createNotification(data: CreateNotificationData) {
  const supabase = createClient()
  
  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      user_id: data.userId,
      project_id: data.projectId,
      title: data.title,
      message: data.message,
      type: data.type || 'info',
      metadata: data.metadata || {}
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating notification:', error)
    return null
  }

  return notification
}

export async function getUserNotifications() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('notifications')
    .select('*, projects(title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching notifications:', error)
    return []
  }

  return data
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return false

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error marking notification as read:', error)
    return false
  }

  return true
}

export async function markAllNotificationsAsRead() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return false

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false)

  if (error) {
    console.error('Error marking all notifications as read:', error)
    return false
  }

  return true
}
