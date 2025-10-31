import { api } from '@/api/api-client';

const postRegistrationURL = '/v2/businesses/registration';

export const postRegistration = async (payload: any) => {
  const response = await api.post(postRegistrationURL, payload);
  return response.data;
}
