import { api } from '@/api/api-client';
// Types
import { PatchRequest } from '../../competitive-updates-types';

export const patchCompetitive = async (payload: PatchRequest) => {
  const response = await api.patch(
    `/v2/merchants/${payload.merchantId}/updates/${payload.id}`,
    payload
  );

  return response.data;
};
