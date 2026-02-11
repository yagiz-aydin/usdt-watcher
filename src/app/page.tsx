"use client";

import { useCoinData } from "@/hooks/useCoinData";
import { PriceCard } from "@/components/PriceCard";
import { VolatilityCard } from "@/components/VolatilityCard";
import { ContractValidator } from "@/components/ContractValidator";
import { RefreshCcw, AlertCircle } from "lucide-react";

export default function Home() {
  const { data, loading, error, refetch } = useCoinData();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          USDT Watcher
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          High-precision volatility tracker and contract validator for Tether (USDT).
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8 flex flex-col items-center">
        {error && (
            <div className="w-full max-w-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">{error}</p>
                <button 
                    onClick={refetch}
                    className="ml-auto p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded transition-colors"
                >
                    <RefreshCcw className="w-4 h-4" />
                </button>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <PriceCard 
            price={data?.market_data?.current_price?.usd} 
            loading={loading} 
          />
          <VolatilityCard 
            change24h={data?.market_data?.price_change_24h}
            percentage24h={data?.market_data?.price_change_percentage_24h}
            loading={loading}
          />
        </div>

        <ContractValidator 
            platforms={data?.platforms}
            loading={loading}
        />

        <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-12 text-center w-full max-w-md">
            Data provided by CoinGecko API. Updates automatically every 30 seconds.
            <br />
            Last updated: {data?.last_updated ? new Date(data.last_updated).toLocaleString() : 'Never'}
        </div>
      </main>
    </div>
  );
}
