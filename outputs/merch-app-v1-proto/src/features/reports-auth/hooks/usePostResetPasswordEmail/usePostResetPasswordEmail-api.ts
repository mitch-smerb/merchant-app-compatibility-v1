import { api } from '@/api/api-client';
import { PostResetPasswordEmail } from '../../reports-auth-types';

export const postResetPasswordEmail = async (payload: PostResetPasswordEmail) => {
  const response = await api.post(`/v2/merchants/reports/forgot-passwor`, payload);
  return response.data;
}
