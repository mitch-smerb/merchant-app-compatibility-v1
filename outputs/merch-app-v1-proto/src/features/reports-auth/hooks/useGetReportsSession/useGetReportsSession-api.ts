import { api } from '@/api/api-client';

export const getReportsSession = async () => {
  const response = await api.get(`/v2/merchants/reports/session`, {
    withCredentials: true,
  });
  return response.data.data;
};
