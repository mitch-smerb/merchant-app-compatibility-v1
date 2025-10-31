import { api } from '@/api/api-client';

export const postReportsLogout = async () => {
  const response = await api.post(
    `/v2/merchants/reports/logout`,
    undefined,
    {
      withCredentials: true
    }
  );
  return response.data;
}
