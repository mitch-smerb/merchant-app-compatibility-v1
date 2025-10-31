import { api } from '@/api/api-client';
import { CreateRequest } from '../../merchant-types';

const postMerchantURL = '/v2/merchants';

export const postMerchant = async (payload: CreateRequest) => {
  const response = await api.post(postMerchantURL, payload);
  return response.data;
}
