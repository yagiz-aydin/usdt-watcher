export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_24h: number; // Mutlak Değişim ($)
    price_change_percentage_24h: number; // Yüzdelik Değişim (%)
    total_volume: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
  };
  platforms: {
    [key: string]: string; // eth, bsc, sol vb.
  };
  last_updated: string;
}

export interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  market_data: any; // We refine this in the main interface
  platforms: any;
}
