import { createClient } from '@/lib/supabase/server'
import { logActivity } from '../activity/activity.service'
import { cookies } from 'next/headers'
import { DEMO_PROJECTS } from '../demo/demo.data'

export type ProjectStatus = 'active' | 'completed' | 'delayed' | 'at_risk'

export interface CreateProjectData {
  title: string
  description?: string
  due_date?: string
  status?: ProjectStatus
}

export async function createProject(data: CreateProjectData) {
  const isDemo = cookies().get('wet_demo')?.value === 'true'
  if (isDemo) {
    return { id: 'demo-new-project', ...data, status: 'active', created_at: new Date().toISOString() }
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      ...data,
      created_by: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    throw error
  }

  // Automatically add creator as an admin member
  await addProjectMember(project.id, user.id, 'admin')

  // Log activity
  await logActivity(project.id, user.id, 'PROJECT_CREATED', { title: data.title })

  return project
}

export async function getProjects() {
  const isDemo = cookies().get('wet_demo')?.value === 'true'
  if (isDemo) return DEMO_PROJECTS

  const supabase = createClient()
  
  // RLS will handle filtering projects the user is a member of
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_members!inner(*), project_updates(progress_percentage, created_at), ai_reports(metadata, created_at)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  // Process data to get the latest progress and AI intelligence
  return data.map(project => {
    const updates = project.project_updates || []
    const latestUpdate = updates.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0]

    const reports = project.ai_reports || []
    const latestReport = reports.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0]
    
    return {
      ...project,
      progress: latestUpdate?.progress_percentage || 0,
      ai_intelligence: latestReport?.metadata || {}
    }
  })
}

export async function getProjectById(projectId: string) {
  const isDemo = cookies().get('wet_demo')?.value === 'true'
  if (isDemo) {
    const demoProject = DEMO_PROJECTS.find(p => p.id === projectId)
    if (demoProject) {
      // Return mock structure that matches Supabase output roughly
      return {
        ...demoProject,
        project_members: demoProject.project_members.map((m, i) => ({ users: { full_name: `Demo User ${i+1}`, email: 'demo@wet.enterprise' } })),
        project_updates: [],
        ai_reports: [{ metadata: demoProject.ai_intelligence }]
      }
    }
    return null
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*, project_members(*, users(full_name, email, avatar_url)), project_updates(*, users(full_name, avatar_url)), ai_reports(*)')
    .eq('id', projectId)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
}

export async function addProjectMember(projectId: string, userId: string, role: string = 'member') {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('project_members')
    .insert({
      project_id: projectId,
      user_id: userId,
      role: role
    })

  if (error) {
    console.error('Error adding project member:', error)
    throw error
  }

  if (user) {
    await logActivity(projectId, user.id, 'MEMBER_ADDED', { userId, role })
  }
}
