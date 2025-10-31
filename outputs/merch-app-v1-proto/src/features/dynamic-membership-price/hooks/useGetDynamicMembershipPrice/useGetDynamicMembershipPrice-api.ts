import { api } from '@/api/api-client';
// Types
import { ApiResponse } from '@/api/api-types';
import { DynamicMembershipPrice } from '../../dynamic-membership-price-types';

const DynamicMembershipPriceURLs = {
  get: '/v2/businesses/dynamic-membership-price',
}

export const fetchDynamicMembershipPrice = async () => {
  const response = await api.get<ApiResponse<DynamicMembershipPrice>>(DynamicMembershipPriceURLs.get);

  return response.data;
};
