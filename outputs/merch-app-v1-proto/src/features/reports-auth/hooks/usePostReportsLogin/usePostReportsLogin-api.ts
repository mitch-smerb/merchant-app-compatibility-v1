import { api } from '@/api/api-client';
import { ReportsLoginRequest, ReportsAuth } from '../../reports-auth-types';

export const postReportsLogin = async (payload: ReportsLoginRequest) => {
  const response = await api.post<ReportsAuth>(
    `/v2/merchants/reports/login`,
    payload,
    {
      withCredentials: true
    }
  );
  return response.data;
}
