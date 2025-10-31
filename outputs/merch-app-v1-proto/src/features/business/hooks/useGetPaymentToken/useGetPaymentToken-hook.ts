import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPaymentToken } from './useGetPaymentToken-api';

export const useGetPaymentToken = (
  useDynamicPricing: boolean = false,
) => {
  return useQuery({
    queryKey: ['paymentToken',],
    queryFn: () => getPaymentToken(useDynamicPricing),
    select: (response) => response?.data,
    staleTime: 1000 * 60 * 5,
    enabled: false,
  })
}
