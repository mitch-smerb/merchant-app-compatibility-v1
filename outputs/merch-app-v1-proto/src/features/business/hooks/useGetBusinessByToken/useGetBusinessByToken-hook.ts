import { useQuery } from '@tanstack/react-query';
import { getBusinessByToken } from './useGetBusinessByToken-api';

export const useGetBusinessByToken = (token : string) => {
  return useQuery({
    queryKey: ['business-by-token', token],
    queryFn: () => getBusinessByToken(token),
    select: (response) => response,
    staleTime: 1000 * 60 * 5,
    enabled: false,
  })
}
