import { api } from "@/api/api-client";
import { ApiResponse } from "@/api/api-types";
import { Merchant } from '../../merchant-types';

export const getMerchant = async (id: number) => {
  const response = await api.get<ApiResponse<Merchant>>(`/v2/merchants/${id}`);

  return response.data.data;
}
