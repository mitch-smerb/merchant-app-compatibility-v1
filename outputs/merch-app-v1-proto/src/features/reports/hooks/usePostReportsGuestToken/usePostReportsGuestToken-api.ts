import { api } from '@/api/api-client';
import { ApiResponse } from "@/api/api-types";
import { ReportsGuestTokenRequest } from '../../reports-types';

export const postReportsGuestToken = async (payload: ReportsGuestTokenRequest, id: number) => {
  const response = await api.post<ApiResponse<ReportsGuestTokenRequest>>(`/v2/merchants/${id}/reports/guest-token`, payload);
  return response.data;
}
