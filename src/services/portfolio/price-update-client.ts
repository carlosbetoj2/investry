export interface PriceUpdatePayload {
  tickers: string[];
}

export interface PriceUpdateResult {
  success: boolean;
  updatedTickers: string[];
  failedTickers: string[];
  error?: string;
}

export interface PriceUpdateClientConfig {
  webhookUrl: string;
  timeout: number;
}

const DEFAULT_CONFIG: PriceUpdateClientConfig = {
  webhookUrl: "http://localhost:5678/webhook-test/investry-prices",
  timeout: 30000,
};

export class PriceUpdateClient {
  private config: PriceUpdateClientConfig;

  constructor(config: Partial<PriceUpdateClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async updatePrices(payload: PriceUpdatePayload): Promise<PriceUpdateResult> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
    try {
      const response = await fetch(this.config.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`Webhook status ${response.status}`);
      const result = await response.json();
      return {
        success: result.success ?? true,
        updatedTickers: result.updatedTickers ?? payload.tickers,
        failedTickers: result.failedTickers ?? [],
      };
    } catch (error) {
      clearTimeout(timeoutId);
      return {
        success: false,
        updatedTickers: [],
        failedTickers: payload.tickers,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

let clientInstance: PriceUpdateClient | null = null;
export function getPriceUpdateClient(config?: Partial<PriceUpdateClientConfig>): PriceUpdateClient {
  if (!clientInstance || config) clientInstance = new PriceUpdateClient(config);
  return clientInstance;
}
