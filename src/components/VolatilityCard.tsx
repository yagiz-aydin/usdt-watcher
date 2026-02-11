import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatChange, cn } from '@/lib/utils';

interface VolatilityCardProps {
  change24h?: number;
  percentage24h?: number;
  loading: boolean;
  title?: string;
}

export const VolatilityCard: React.FC<VolatilityCardProps> = ({ change24h, percentage24h, loading, title = "24h Volatility" }) => {
  const isPositive = percentage24h && percentage24h > 0;
  const isNegative = percentage24h && percentage24h < 0;
  const isNeutral = !percentage24h || percentage24h === 0;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 w-full max-w-sm">
      <h2 className="text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-2 uppercase tracking-wider">
        {title}
      </h2>
      
      {loading ? (
        <div className="space-y-2">
            <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
            <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
        </div>
      ) : (
        <div className={cn(
            "flex flex-col",
             isPositive && "text-positive",
             isNegative && "text-negative",
             isNeutral && "text-neutral-500"
        )}>
          <div className="flex items-center gap-2">
            {isPositive && <TrendingUp className="w-8 h-8" />}
            {isNegative && <TrendingDown className="w-8 h-8" />}
            {isNeutral && <Minus className="w-8 h-8" />}
            
            <span className="text-4xl font-mono font-bold">
              {percentage24h !== undefined ? formatChange(percentage24h) : '0.00%'}
            </span>
          </div>
          
          <span className="text-sm mt-1 opacity-80 font-mono">
            {change24h && change24h > 0 ? '+' : ''}{change24h?.toFixed(8)} USD
          </span>
        </div>
      )}
    </div>
  );
};
