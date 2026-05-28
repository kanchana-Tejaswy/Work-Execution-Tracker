import { createClient } from '@/lib/supabase/server'

export interface AIReportData {
  projectId: string
  summary: string
  riskLevel: 'low' | 'medium' | 'high'
  aiConfidence: number
  metadata?: Record<string, any>
}

export async function createAIReport(data: AIReportData) {
  const supabase = createClient()

  const { data: report, error } = await supabase
    .from('ai_reports')
    .insert({
      project_id: data.projectId,
      summary: data.summary,
      risk_level: data.riskLevel,
      ai_confidence: data.aiConfidence,
      metadata: data.metadata || {}
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating AI report:', error)
    throw error
  }

  return report
}

export async function getLatestAIReport(projectId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('ai_reports')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // No rows found
    console.error('Error fetching AI report:', error)
    return null
  }

  return data
}
