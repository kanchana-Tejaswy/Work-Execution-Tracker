import { NextResponse } from 'next/server'
import { 
  getUserNotifications, 
  markNotificationAsRead,
  markAllNotificationsAsRead 
} from '@/services/notifications/notification.service'

export async function GET() {
  try {
    const notifications = await getUserNotifications()
    return NextResponse.json(notifications)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    
    if (body.action === 'mark_all_read') {
      const success = await markAllNotificationsAsRead()
      return NextResponse.json({ success })
    }
    
    if (body.notificationId) {
      const success = await markNotificationAsRead(body.notificationId)
      return NextResponse.json({ success })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
