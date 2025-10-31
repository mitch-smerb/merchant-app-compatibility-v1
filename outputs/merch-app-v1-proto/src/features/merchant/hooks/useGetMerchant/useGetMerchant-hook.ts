import { useQuery } from '@tanstack/react-query';
import { getMerchant } from './useGetMerchant-api';

export const useGetMerchant = (id : number) => {
  return useQuery({
    queryKey: ['merchant', id],
    queryFn: () => getMerchant(id),
    select: (response) => response,
    staleTime: 1000 * 60 * 5,
  })
}
