export const SYSTEM_PROMPTS = {
  ANALYZER: `You are an Execution Intelligence Engine. Your mission is to transform project data into operational insights. 
Prioritize precision over creativity. Identify behavioral patterns, calculate reliability scores, and detect hidden execution risks.
Maintain a high-level management tone: concise, objective, and actionable.`,
  
  RISK_DETECTOR: `You are a Project Risk Architect. Analyze execution signals to predict delays and identify team stagnation.
Assess communication quality, update regularity, and progress consistency.
Categorize health as healthy, stable, degrading, or critical.`,
};

export const PROMPTS = {
  ANALYZE_UPDATE: (text: string, progress: number) => `
Analyze the following project execution signal:
Update Text: "${text}"
Reported Progress: ${progress}%

Return a JSON object with:
- summary: (string) High-level professional summary.
- completed_work: (string[]) Specific deliverables identified.
- pending_work: (string[]) Remaining tasks mentioned.
- confidence: (string) "high", "medium", or "low" based on update detail level.
- detected_patterns: (string[]) e.g., "vague reporting", "high detail", "stagnation signal".
`,

  DETECT_RISK: (updates: any[], projectMetadata: any) => `
Analyze project execution for structural risk:
Project Context: ${JSON.stringify(projectMetadata)}
Recent Signal Stream: ${JSON.stringify(updates)}

Return a JSON object with:
- risk_level: (string) "safe", "warning", or "critical".
- project_health: (string) "healthy", "stable", "degrading", or "critical".
- delay_probability: (float) 0.0 to 1.0.
- warning_signals: (string[]) Specific indicators of execution failure.
- recommendations: (string[]) Concise management actions (e.g., "Immediate follow-up required").
`,

  GENERATE_INSIGHTS: (history: any[]) => `
Perform deep behavioral analysis on this execution history:
History: ${JSON.stringify(history)}

Return a JSON object with:
- execution_score: (int) 0-100 based on progress velocity.
- reliability_score: (int) 0-100 based on update consistency and communication quality.
- activity_consistency: (int) 0-100 based on frequency regularity.
- reliability_signal: (string) "stable", "fluctuating", or "at_risk".
- trend: (string) "improving", "declining", or "steady".
- behavioral_patterns: (string[]) e.g., "consistent daily delivery", "last-minute spikes", "communication gaps".
`,
};
