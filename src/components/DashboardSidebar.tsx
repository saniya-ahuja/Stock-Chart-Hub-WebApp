import { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Popular tickers for quick selection
const POPULAR_TICKERS = ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA", "AMZN"];

interface DashboardSidebarProps {
  ticker: string;
  startDate: Date;
  endDate: Date;
  onTickerChange: (ticker: string) => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onSearch: () => void;
}

export function DashboardSidebar({
  ticker,
  startDate,
  endDate,
  onTickerChange,
  onStartDateChange,
  onEndDateChange,
  onSearch,
}: DashboardSidebarProps) {
  const [inputValue, setInputValue] = useState(ticker);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTickerChange(inputValue.toUpperCase());
    onSearch();
  };

  const handleQuickSelect = (t: string) => {
    setInputValue(t);
    onTickerChange(t);
    onSearch();
  };

  return (
    <aside className="w-72 min-h-screen border-r border-border bg-card p-6 flex flex-col gap-6">
      {/* Logo / Title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center glow-primary">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold font-mono tracking-tight text-foreground">
            StockViz
          </h1>
          <p className="text-xs text-muted-foreground font-mono">Terminal v1.0</p>
        </div>
      </div>

      {/* Ticker Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Ticker Symbol
        </label>
        <div className="relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            placeholder="e.g. GOOGL"
            className="font-mono text-sm bg-muted border-border pr-10 placeholder:text-muted-foreground/50"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Quick Select */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Popular
        </label>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_TICKERS.map((t) => (
            <button
              key={t}
              onClick={() => handleQuickSelect(t)}
              className={cn(
                "px-2.5 py-1 rounded text-xs font-mono border transition-all",
                t === ticker
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Date Range
        </label>

        {/* Start Date */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-mono">From</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start font-mono text-xs bg-muted border-border text-foreground"
              >
                {format(startDate, "yyyy-MM-dd")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(d) => d && onStartDateChange(d)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-mono">To</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start font-mono text-xs bg-muted border-border text-foreground"
              >
                {format(endDate, "yyyy-MM-dd")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(d) => d && onEndDateChange(d)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={() => {
          onTickerChange(inputValue.toUpperCase());
          onSearch();
        }}
        className="w-full font-mono text-sm bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Search className="h-4 w-4 mr-2" />
        Load Data
      </Button>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          Data is simulated for demonstration. Connect to Alpha Vantage or Yahoo
          Finance API for live data.
        </p>
      </div>
    </aside>
  );
}
