import React from 'react';
import { formatCurrency } from '@/lib/utils'; // Assuming formatCurrency is also in utils

interface PriceCardProps {
  price?: number;
  loading: boolean;
  title?: string;
}

export const PriceCard: React.FC<PriceCardProps> = ({ price, loading, title = "Current Price (USD)" }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 w-full max-w-sm">
      <h2 className="text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-2 uppercase tracking-wider">
        {title}
      </h2>
      <div className="flex items-center">
        {loading ? (
          <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
        ) : (
          <span className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {price ? formatCurrency(price) : 'N/A'}
          </span>
        )}
      </div>
    </div>
  );
};
