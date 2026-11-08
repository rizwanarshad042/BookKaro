import { useCallback, useEffect, useState } from 'react';
import { getMockHotels } from '../data/mockData';

export const useHotels = (filters = {}) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    try {
      const location = String(filters.location || '').toLowerCase();
      const result = getMockHotels().filter((hotel) => !location || hotel.location.city.toLowerCase().includes(location));
      setHotels(result);
      setError(null);
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, [filters.location]);

  useEffect(() => refetch(), [refetch]);

  return { hotels, loading, error, refetch };
};
