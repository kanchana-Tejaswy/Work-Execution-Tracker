import { OllamaClient } from './utils/ollama.client';
import { UpdateAnalyzer, RiskDetector, InsightGenerator } from './analyzers/execution.analyzer';
import { AIAnalysisResult } from '@/types/ai';

export class AIEngine {
  private client: OllamaClient;
  private updateAnalyzer: UpdateAnalyzer;
  private riskDetector: RiskDetector;
  private insightGenerator: InsightGenerator;

  constructor() {
    this.client = new OllamaClient();
    this.updateAnalyzer = new UpdateAnalyzer(this.client);
    this.riskDetector = new RiskDetector(this.client);
    this.insightGenerator = new InsightGenerator(this.client);
  }

  /**
   * Performs a comprehensive analysis of a project's current state.
   */
  async analyzeProject(projectId: string, updates: any[], projectMetadata: any): Promise<AIAnalysisResult> {
    try {
      // Run analysis in parallel
      const [risk, insights] = await Promise.all([
        this.riskDetector.detect(updates, projectMetadata),
        this.insightGenerator.generate(updates)
      ]);

      // If there's at least one update, analyze the latest one for the summary
      let summary = "No recent updates to analyze.";
      let behavioralPatterns = insights.behavioral_patterns;

      if (updates.length > 0) {
        const latestUpdate = updates[0];
        const updateAnalysis = await this.updateAnalyzer.analyze(
          latestUpdate.update_text, 
          latestUpdate.progress_percentage || 0
        );
        summary = updateAnalysis.summary;
        // Merge patterns from both sources
        behavioralPatterns = Array.from(new Set([...behavioralPatterns, ...(updateAnalysis.detected_patterns || [])]));
      }

      return {
        summary,
        project_health: risk.project_health,
        risk_level: risk.risk_level,
        execution_score: insights.execution_score,
        reliability_score: insights.reliability_score,
        delay_probability: risk.delay_probability,
        detected_risks: risk.warning_signals,
        behavioral_patterns: behavioralPatterns,
        recommendations: risk.recommendations,
        metadata: {
          activity_consistency: insights.activity_consistency,
          reliability_signal: insights.reliability_signal,
          trend: insights.trend
        }
      };
    } catch (error) {
      console.error('AI Analysis failed:', error);
      return this.getFallbackResult();
    }
  }

  private getFallbackResult(): AIAnalysisResult {
    return {
      summary: "AI analysis currently unavailable.",
      project_health: "healthy",
      risk_level: "safe",
      execution_score: 0,
      reliability_score: 0,
      delay_probability: 0,
      detected_risks: ["Service connectivity issue"],
      behavioral_patterns: [],
      recommendations: ["Check AI engine connection"],
      metadata: {}
    };
  }
}

// Export a singleton instance
export const aiEngine = new AIEngine();
