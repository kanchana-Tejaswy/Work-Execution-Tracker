import { createAIReport, getLatestAIReport } from './projects/ai.service'
import { getProjectUpdates } from './projects/update.service'
import { getProjectById } from './projects/project.service'
import { aiEngine } from './ai'
import { createClient } from '@/lib/supabase/server'

export class AIService {
  /**
   * Summarizes project updates and saves the report using the new AIEngine.
   */
  static async processProjectUpdates(projectId: string) {
    const [updates, project] = await Promise.all([
      getProjectUpdates(projectId),
      getProjectById(projectId)
    ])
    
    if (updates.length === 0 || !project) {
      return null
    }

    // Call the modular AI Engine
    const analysis = await aiEngine.analyzeProject(projectId, updates, project)

    // Map AI risk levels to database risk levels
    const riskMapping: Record<string, 'active' | 'at_risk' | 'delayed'> = {
      'safe': 'active',
      'warning': 'at_risk',
      'critical': 'delayed'
    }

    const reportLevelMapping: Record<string, 'low' | 'medium' | 'high'> = {
      'safe': 'low',
      'warning': 'medium',
      'critical': 'high'
    }

    const supabase = createClient()
    
    // Update project status based on AI findings
    await supabase
      .from('projects')
      .update({ status: riskMapping[analysis.risk_level] || 'active' })
      .eq('id', projectId)

    const report = await createAIReport({
      projectId,
      summary: analysis.summary,
      riskLevel: reportLevelMapping[analysis.risk_level] || 'low',
      aiConfidence: 1 - analysis.delay_probability, // reliability context
      metadata: {
        project_health: analysis.project_health,
        execution_score: analysis.execution_score,
        reliability_score: analysis.reliability_score,
        delay_probability: analysis.delay_probability,
        detected_risks: analysis.detected_risks,
        behavioral_patterns: analysis.behavioral_patterns,
        recommendations: analysis.recommendations,
        ...analysis.metadata
      }
    })

    return report
  }

  /**
   * Fetches the most recent analysis for a project.
   */
  static async getProjectRiskStatus(projectId: string) {
    return await getLatestAIReport(projectId)
  }
}
