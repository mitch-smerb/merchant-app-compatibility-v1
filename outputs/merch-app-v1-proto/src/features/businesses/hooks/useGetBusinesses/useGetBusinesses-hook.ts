import { useQuery } from '@tanstack/react-query';
import { fetchBusinesses } from './useGetBusinesses-api';

export const useGetBusinesses = (page = 1, limit = 30, query = '') => {
  return useQuery({
    queryKey: ['businesses', { page, limit, query }],
    queryFn: () => fetchBusinesses(page, limit, query),
    select: (response) => ({
      businesses: Array.isArray(response?.data) ? response.data : null,
      pagination: response?.pagination
    }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: false,
  });
};
