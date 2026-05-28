import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json({ projects: [], updates: [], users: [] })
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Note: RLS ensures users only see what they have access to.

    // 1. Search Projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, status, due_date')
      .ilike('title', `%${query}%`)
      .limit(5)

    // 2. Search Updates
    const { data: updates, error: updatesError } = await supabase
      .from('project_updates')
      .select('id, project_id, update_text, progress_percentage, created_at, projects(title)')
      .ilike('update_text', `%${query}%`)
      .order('created_at', { ascending: false })
      .limit(5)

    // 3. Search Users (who are part of the same projects)
    // For simplicity, we just search users if they are visible via RLS
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, full_name, role, email')
      .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(5)

    return NextResponse.json({
      projects: projects || [],
      updates: updates || [],
      users: users || []
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
