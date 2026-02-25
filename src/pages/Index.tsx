import { useState, useCallback } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { PriceChart, VolumeChart } from "@/components/StockCharts";
import { StockStatsPanel } from "@/components/StockStats";
import {
  generateStockData,
  calculateStats,
  exportToCSV,
  StockDataPoint,
} from "@/lib/stockData";

// Default date range: last 6 months
const defaultEnd = new Date();
const defaultStart = new Date();
defaultStart.setMonth(defaultStart.getMonth() - 6);

const Index = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [data, setData] = useState<StockDataPoint[]>(() =>
    generateStockData("AAPL", defaultStart, defaultEnd)
  );

  const stats = calculateStats(data);

  const handleSearch = useCallback(() => {
    const newData = generateStockData(ticker, startDate, endDate);
    setData(newData);
  }, [ticker, startDate, endDate]);

  const handleExport = () => {
    if (data.length > 0) exportToCSV(data, ticker);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        ticker={ticker}
        startDate={startDate}
        endDate={endDate}
        onTickerChange={setTicker}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto terminal-grid">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-mono tracking-tight text-foreground">
              {ticker}{" "}
              <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {data.length} trading days • {data.length > 0 ? data[0].date : ""}{" "}
              → {data.length > 0 ? data[data.length - 1].date : ""}
            </p>
          </div>
          <Button
            onClick={handleExport}
            variant="outline"
            className="font-mono text-xs border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </header>

        {/* Charts */}
        <div className="space-y-6">
          <PriceChart data={data} ticker={ticker} />
          <VolumeChart data={data} ticker={ticker} />

          {/* Stats */}
          <StockStatsPanel stats={stats} ticker={ticker} />
        </div>
      </main>
    </div>
  );
};

export default Index;
