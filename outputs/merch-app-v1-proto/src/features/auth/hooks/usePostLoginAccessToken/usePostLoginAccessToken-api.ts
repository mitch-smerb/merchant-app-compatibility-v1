import { api } from '@/api/api-client';
import { ApiResponse } from '@/api/api-types';
import { Auth } from '../../auth-types';

export const postLoginAccessToken = async (payload?: { email: string }) => {
  const response = await api.post<Auth>(`/v2/merchants/login`, payload);
  return response.data;
}
