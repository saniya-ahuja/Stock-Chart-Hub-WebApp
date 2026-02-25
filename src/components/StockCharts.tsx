import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { StockDataPoint } from "@/lib/stockData";

interface PriceChartProps {
  data: StockDataPoint[];
  ticker: string;
}

// Custom tooltip for consistent terminal styling
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-md p-3 shadow-lg font-mono text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {typeof p.value === "number" && p.value > 1000
            ? p.value.toLocaleString()
            : p.value}
        </p>
      ))}
    </div>
  );
}

export function PriceChart({ data, ticker }: PriceChartProps) {
  // Show fewer ticks for readability
  const tickInterval = Math.max(Math.floor(data.length / 8), 1);

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-sm font-semibold text-foreground tracking-wide">
          {ticker} — Closing Price
        </h2>
        <span className="text-xs font-mono text-primary animate-pulse-glow">● LIVE</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(220 15% 18%)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(200 10% 50%)" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(220 15% 18%)" }}
            interval={tickInterval}
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(200 10% 50%)" }}
            tickLine={false}
            axisLine={false}
            domain={["auto", "auto"]}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="close"
            name="Close"
            stroke="hsl(185 80% 55%)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "hsl(185 80% 55%)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function VolumeChart({ data, ticker }: PriceChartProps) {
  const tickInterval = Math.max(Math.floor(data.length / 8), 1);

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-sm font-semibold text-foreground tracking-wide">
          {ticker} — Trading Volume
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(220 15% 18%)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(200 10% 50%)" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(220 15% 18%)" }}
            interval={tickInterval}
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(200 10% 50%)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar
            dataKey="volume"
            name="Volume"
            fill="hsl(145 60% 50%)"
            opacity={0.7}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
