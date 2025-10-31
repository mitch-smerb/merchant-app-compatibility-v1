import { api } from '@/api/api-client';

// Types
import { ApiResponse } from '@/api/api-types';
import { MembershipPriceRequest } from '../../membershipPrice-types';

const MembershipPriceURLs = {
  get: '/v2/businesses/membership-price',
}

export const fetchMembershipPrice = async (numberOfLocations: number, promoCode?: string, isUpgrade = false) => {
  const response = await api.get<ApiResponse<MembershipPriceRequest>>(MembershipPriceURLs.get, {
    params: { numberOfLocations, promoCode, isUpgrade }
  });

  return response.data;
};
