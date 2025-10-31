import { api } from '@/api/api-client';
import { ApiResponse } from "@/api/api-types";

import { MerchantCompetitiveUpdates } from '../../competitive-updates-types';

export const getCompetitive = async (id: number) => {
  const response = await api.get<ApiResponse<MerchantCompetitiveUpdates>>(`/v2/merchants/${id}/updates/`);

  return response.data.data;
};
