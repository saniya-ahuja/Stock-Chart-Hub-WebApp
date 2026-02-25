import { StockStats as StockStatsType } from "@/lib/stockData";
import { TrendingUp, TrendingDown, BarChart3, Hash, ArrowUpDown } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
}

function StatCard({ label, value, icon, color }: StatsCardProps) {
  return (
    <div className="stat-card flex items-center gap-4">
      <div className={`h-10 w-10 rounded-md flex items-center justify-center bg-primary/10 ${color || ""}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="text-lg font-mono font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

interface StockStatsProps {
  stats: StockStatsType;
  ticker: string;
}

export function StockStatsPanel({ stats, ticker }: StockStatsProps) {
  const formatPrice = (v: number) => `$${v.toFixed(2)}`;
  const formatVolume = (v: number) =>
    v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v.toLocaleString();

  return (
    <div className="space-y-3">
      <h2 className="font-mono text-sm font-semibold text-foreground tracking-wide">
        {ticker} — Descriptive Statistics
        <span className="text-muted-foreground font-normal ml-2">
          (.describe())
        </span>
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard
          label="Mean Price"
          value={formatPrice(stats.mean)}
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
        />
        <StatCard
          label="Max Price"
          value={formatPrice(stats.max)}
          icon={<TrendingUp className="h-5 w-5 text-accent" />}
        />
        <StatCard
          label="Min Price"
          value={formatPrice(stats.min)}
          icon={<TrendingDown className="h-5 w-5 text-destructive" />}
        />
        <StatCard
          label="Std Dev"
          value={`$${stats.std.toFixed(2)}`}
          icon={<ArrowUpDown className="h-5 w-5 text-chart-amber" />}
        />
        <StatCard
          label="Data Points"
          value={stats.count.toString()}
          icon={<Hash className="h-5 w-5 text-primary" />}
        />
        <StatCard
          label="Avg Volume"
          value={formatVolume(stats.avgVolume)}
          icon={<BarChart3 className="h-5 w-5 text-accent" />}
        />
      </div>
    </div>
  );
}
