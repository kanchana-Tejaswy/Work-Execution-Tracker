import { NextResponse } from 'next/server'
import { submitUpdate, getProjectUpdates } from '@/services/projects/update.service'
import { AIService } from '@/services/ai.service'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const update = await submitUpdate(body)
    
    // Trigger AI analysis in the background (or wait for it if you want real-time feedback)
    // For this MVP, we wait to ensure the dashboard reflects the latest AI insight immediately
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
