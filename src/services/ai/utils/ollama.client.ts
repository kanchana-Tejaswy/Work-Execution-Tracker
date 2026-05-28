import { AIModelConfig } from '@/types/ai';

const DEFAULT_CONFIG: AIModelConfig = {
  baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  model: process.env.OLLAMA_MODEL || 'llama3',
  temperature: 0.1,
  timeout: 30000,
};

export class OllamaClient {
  private config: AIModelConfig;

  constructor(config?: Partial<AIModelConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async generate(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(`${this.config.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.config.model,
          prompt,
          system: systemPrompt,
          stream: false,
          options: {
            temperature: this.config.temperature,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Ollama request timed out');
      }
      console.error('Error calling Ollama:', error);
      throw error;
    }
  }

  async generateJson<T>(prompt: string, systemPrompt?: string): Promise<T> {
    const rawResponse = await this.generate(
      `${prompt}\n\nIMPORTANT: Return ONLY valid JSON. No other text.`,
      systemPrompt
    );

    try {
      // Find the first '{' and last '}' to extract JSON in case of extra text
      const start = rawResponse.indexOf('{');
      const end = rawResponse.lastIndexOf('}');
      if (start === -1 || end === -1) throw new Error('No JSON found in response');
      
      const jsonStr = rawResponse.substring(start, end + 1);
      return JSON.parse(jsonStr) as T;
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', rawResponse);
      throw new Error('AI output was not valid JSON');
    }
  }
}
