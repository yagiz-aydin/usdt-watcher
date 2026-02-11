import { useState, useEffect, useCallback } from 'react';
import { fetchCoinData } from '@/lib/api';
import { CoinData } from '@/lib/types';

export const useCoinData = (pollingInterval: number | null = 30000) => {
  const [data, setData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchCoinData();
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    if (pollingInterval === null) return;

    const intervalId = setInterval(fetchData, pollingInterval);

    return () => clearInterval(intervalId);
  }, [fetchData, pollingInterval]);

  return { data, loading, error, refetch: fetchData };
};
