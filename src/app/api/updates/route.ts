import { NextResponse } from 'next/server'
import { submitUpdate, getProjectUpdates } from '@/services/projects/update.service'
import { getProjectById } from '@/services/projects/project.service'
import { createNotification } from '@/services/notifications/notification.service'
import { AIService } from '@/services/ai.service'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const update = await submitUpdate(body)
    
    // Fetch project details to know who to notify
    const project = await getProjectById(body.projectId);
    
    if (project && project.created_by && project.created_by !== update.user_id) {
      // Notify the project creator that a signal was submitted
      const hasAttachment = !!body.attachmentUrl;
      await createNotification({
        userId: project.created_by,
        projectId: body.projectId,
        title: 'New Execution Signal Logged',
        message: `An update was submitted for ${project.title}. ${hasAttachment ? 'Evidence attached.' : 'No supporting evidence provided.'}`,
        type: hasAttachment ? 'info' : 'attention' // Flag as attention needed if no evidence
      });
    }
    
    // Trigger AI analysis in the background
    await AIService.processProjectUpdates(body.projectId)
    
    return NextResponse.json(update, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return NextResponse.json({ error: 'Missing projectId' }, { status: 400 })
  }

  try {
    const updates = await getProjectUpdates(projectId)
    return NextResponse.json(updates)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
