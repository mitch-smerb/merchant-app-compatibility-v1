import { useQuery } from '@tanstack/react-query';
import { getReportsSession } from './useGetReportsSession-api';

export const useGetReportsSession = () => {
  return useQuery({
    queryKey: ['reports-session'],
    queryFn: () => getReportsSession(),
    select: (response) => response,
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: false
  })
}
