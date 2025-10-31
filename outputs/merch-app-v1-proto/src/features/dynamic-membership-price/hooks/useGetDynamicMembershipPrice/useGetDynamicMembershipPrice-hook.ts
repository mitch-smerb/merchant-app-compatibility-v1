import { useQuery } from '@tanstack/react-query';
import { fetchDynamicMembershipPrice } from './useGetDynamicMembershipPrice-api';

export const useGetDynamicMembershipPrice = () => {
  return useQuery({
    queryKey: ['dynamic-membership-price'],
    queryFn: fetchDynamicMembershipPrice,
    select: (response) => ({
      merchantMaxCardholderAudience: response.data.merchantMaxCardholderAudience,
      monthly: response.data.monthly,
    }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
