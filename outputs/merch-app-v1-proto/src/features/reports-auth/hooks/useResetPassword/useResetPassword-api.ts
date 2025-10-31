import { api } from '@/api/api-client';
import { ResetPassword } from '../../reports-auth-types';

export const postResetPasswordEmail = async (
  payload: ResetPassword,
  headers: Record<string, string> = {}
) => {
  const response = await api.post(`/v2/merchants/reports/reset-password`, payload, { headers });
  return response.data;
}
