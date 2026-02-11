import axios from 'axios';
import { CoinData } from './types';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/tether';

const CACHE_KEY = 'usdt_watcher_cache';

const isClient = typeof window !== 'undefined';

export const fetchCoinData = async (): Promise<CoinData> => {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    if (isClient) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      if (isClient) {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          console.warn('Rate limit exceeded. Serving cached data.');
          return JSON.parse(cachedData) as CoinData;
        }
      }
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    console.error('Error fetching coin data:', error);
    throw "Error fetching coin data";
  }
};
