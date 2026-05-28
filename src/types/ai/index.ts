export type RiskLevel = 'safe' | 'warning' | 'critical';
export type ProjectHealth = 'healthy' | 'stable' | 'degrading' | 'critical';

export interface UpdateAnalysis {
  summary: string;
  completed_work: string[];
  pending_work: string[];
  confidence: 'low' | 'medium' | 'high';
  detected_patterns: string[];
}

export interface RiskAnalysis {
  risk_level: RiskLevel;
  project_health: ProjectHealth;
  delay_probability: number; // 0 to 1
  warning_signals: string[];
  recommendations: string[];
}

export interface ExecutionInsights {
  execution_score: number; // 0 to 100
  reliability_score: number; // 0 to 100
  activity_consistency: number; // 0 to 100
  reliability_signal: 'stable' | 'fluctuating' | 'at_risk';
  trend: 'improving' | 'declining' | 'steady';
  behavioral_patterns: string[];
}

export interface AIAnalysisResult {
  summary: string;
  project_health: ProjectHealth;
  risk_level: RiskLevel;
  execution_score: number;
  reliability_score: number;
  delay_probability: number;
  detected_risks: string[];
  behavioral_patterns: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface AIModelConfig {
  baseUrl: string;
  model: string;
  temperature?: number;
  timeout?: number;
}
