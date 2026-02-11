"use client";

import { useState } from "react";
import { useCoinData } from "@/hooks/useCoinData";
import { PriceCard } from "@/components/PriceCard";
import { VolatilityCard } from "@/components/VolatilityCard";
import { ContractValidator } from "@/components/ContractValidator";
import { RefreshCcw, AlertCircle } from "lucide-react";

export default function Home() {
  const [interval, setIntervalVal] = useState<number | null>(30000);
  const { data, loading, error, refetch } = useCoinData(interval);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          USDT İzleyici
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          Tether (USDT) için yüksek hassasiyetli volatilite takipçisi ve kontrat doğrulayıcısı.
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
                    title="Tekrar dene"
                >
                    <RefreshCcw className="w-4 h-4" />
                </button>
            </div>
        )}

        <div className="flex items-center justify-end w-full max-w-2xl gap-3">
          <select
            value={interval === null ? "manual" : interval}
            onChange={(e) => {
              const val = e.target.value;
              setIntervalVal(val === "manual" ? null : Number(val));
            }}
            className="text-sm border border-neutral-300 dark:border-neutral-700 rounded px-2 py-1 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10000">10sn</option>
            <option value="30000">30sn</option>
            <option value="60000">1dk</option>
            <option value="manual">Manuel</option>
          </select>
          
          <button
            onClick={refetch}
            disabled={loading}
            className="p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
            title="Veriyi Yenile"
          >
            <RefreshCcw className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <PriceCard 
            price={data?.market_data?.current_price?.usd} 
            loading={loading}
            title="Güncel Fiyat (USD)"
          />
          <VolatilityCard 
            change24h={data?.market_data?.price_change_24h}
            percentage24h={data?.market_data?.price_change_percentage_24h}
            loading={loading}
            title="24sa Volatilite"
          />
        </div>

        <ContractValidator 
            platforms={data?.platforms}
            loading={loading}
            title="Kontrat Doğrulayıcı"
            badgeText="Resmi"
            copyTitle="Adresi Kopyala"
            viewTitle="Explorer'da Görüntüle"
        />

        <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-12 text-center w-full max-w-md">
            Veriler CoinGecko API tarafından sağlanmaktadır. Her 30 saniyede bir otomatik güncellenir.
            <br />
            Son güncelleme: {data?.last_updated ? new Date(data.last_updated).toLocaleString('tr-TR') : 'Asla'}
        </div>
      </main>
    </div>
  );
}
