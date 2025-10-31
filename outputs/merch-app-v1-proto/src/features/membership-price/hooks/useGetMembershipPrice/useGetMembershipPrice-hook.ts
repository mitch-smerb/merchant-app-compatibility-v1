import { useQuery } from '@tanstack/react-query';
import { fetchMembershipPrice } from './useGetMembershipPrice-api';

export const useGetMembershipPrice = (numberOfLocations: number, promoCode?: string, isUpgrade = false) => {
  return useQuery({
    queryKey: ['membership-price', { numberOfLocations, promoCode, isUpgrade }],
    queryFn: () => fetchMembershipPrice(numberOfLocations, promoCode, isUpgrade),
    select: (response) => ({
      default: response.data.default,
      promoCodeApplied: response.data.promoCodeApplied,
    }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
