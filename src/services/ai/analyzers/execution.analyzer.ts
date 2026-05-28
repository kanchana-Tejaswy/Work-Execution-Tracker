import { OllamaClient } from '../utils/ollama.client';
import { PROMPTS, SYSTEM_PROMPTS } from '../prompts/templates';
import { UpdateAnalysis, RiskAnalysis, ExecutionInsights } from '@/types/ai';

export class UpdateAnalyzer {
  private client: OllamaClient;

  constructor(client: OllamaClient) {
    this.client = client;
  }

  async analyze(text: string, progress: number): Promise<UpdateAnalysis> {
    const prompt = PROMPTS.ANALYZE_UPDATE(text, progress);
    return await this.client.generateJson<UpdateAnalysis>(prompt, SYSTEM_PROMPTS.ANALYZER);
  }
}

export class RiskDetector {
  private client: OllamaClient;

  constructor(client: OllamaClient) {
    this.client = client;
  }

  async detect(updates: any[], projectMetadata: any): Promise<RiskAnalysis> {
    const prompt = PROMPTS.DETECT_RISK(updates, projectMetadata);
    return await this.client.generateJson<RiskAnalysis>(prompt, SYSTEM_PROMPTS.RISK_DETECTOR);
  }
}

export class InsightGenerator {
  private client: OllamaClient;

  constructor(client: OllamaClient) {
    this.client = client;
  }

  async generate(history: any[]): Promise<ExecutionInsights> {
    const prompt = PROMPTS.GENERATE_INSIGHTS(history);
    return await this.client.generateJson<ExecutionInsights>(prompt, SYSTEM_PROMPTS.ANALYZER);
  }
}
