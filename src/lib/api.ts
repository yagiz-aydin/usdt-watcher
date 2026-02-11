import axios from 'axios';
import { CoinData } from './types';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/tether';

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

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    console.error('Error fetching coin data:', error);
    throw error;
  }
};
