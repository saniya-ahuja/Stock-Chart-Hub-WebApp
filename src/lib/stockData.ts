// Mock stock data generator for demonstration purposes
// In production, replace with real API calls (e.g., Alpha Vantage, Yahoo Finance)

export interface StockDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockStats {
  mean: number;
  max: number;
  min: number;
  std: number;
  count: number;
  maxVolume: number;
  avgVolume: number;
}

/**
 * Generates realistic mock stock data for a given ticker and date range.
 * Uses a random walk algorithm seeded by the ticker name for consistency.
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function hashTicker(ticker: string): number {
  let hash = 0;
  for (let i = 0; i < ticker.length; i++) {
    hash = (hash << 5) - hash + ticker.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Base prices for well-known tickers
const BASE_PRICES: Record<string, number> = {
  AAPL: 178,
  GOOGL: 141,
  MSFT: 378,
  AMZN: 178,
  TSLA: 248,
  META: 474,
  NVDA: 875,
  NFLX: 605,
  SPY: 502,
};

export function generateStockData(
  ticker: string,
  startDate: Date,
  endDate: Date
): StockDataPoint[] {
  const hash = hashTicker(ticker.toUpperCase());
  const rand = seededRandom(hash);
  const basePrice = BASE_PRICES[ticker.toUpperCase()] || 50 + rand() * 400;
  const baseVolume = 10_000_000 + rand() * 90_000_000;
  const data: StockDataPoint[] = [];

  let price = basePrice;
  const current = new Date(startDate);

  while (current <= endDate) {
    // Skip weekends
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      const change = (rand() - 0.48) * price * 0.03;
      price = Math.max(price + change, 1);

      const dayHigh = price * (1 + rand() * 0.02);
      const dayLow = price * (1 - rand() * 0.02);
      const dayOpen = dayLow + rand() * (dayHigh - dayLow);
      const volume = Math.round(baseVolume * (0.5 + rand()));

      data.push({
        date: current.toISOString().split("T")[0],
        open: parseFloat(dayOpen.toFixed(2)),
        high: parseFloat(dayHigh.toFixed(2)),
        low: parseFloat(dayLow.toFixed(2)),
        close: parseFloat(price.toFixed(2)),
        volume,
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return data;
}

/**
 * Calculates descriptive statistics similar to pandas .describe()
 */
export function calculateStats(data: StockDataPoint[]): StockStats {
  if (data.length === 0) {
    return { mean: 0, max: 0, min: 0, std: 0, count: 0, maxVolume: 0, avgVolume: 0 };
  }

  const closes = data.map((d) => d.close);
  const volumes = data.map((d) => d.volume);
  const mean = closes.reduce((a, b) => a + b, 0) / closes.length;
  const max = Math.max(...closes);
  const min = Math.min(...closes);
  const variance = closes.reduce((sum, v) => sum + (v - mean) ** 2, 0) / closes.length;
  const std = Math.sqrt(variance);
  const maxVolume = Math.max(...volumes);
  const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

  return {
    mean: parseFloat(mean.toFixed(2)),
    max: parseFloat(max.toFixed(2)),
    min: parseFloat(min.toFixed(2)),
    std: parseFloat(std.toFixed(2)),
    count: data.length,
    maxVolume,
    avgVolume: Math.round(avgVolume),
  };
}

/**
 * Exports stock data array as a downloadable CSV file
 */
export function exportToCSV(data: StockDataPoint[], ticker: string): void {
  const headers = ["Date", "Open", "High", "Low", "Close", "Volume"];
  const rows = data.map((d) =>
    [d.date, d.open, d.high, d.low, d.close, d.volume].join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${ticker.toUpperCase()}_stock_data.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
