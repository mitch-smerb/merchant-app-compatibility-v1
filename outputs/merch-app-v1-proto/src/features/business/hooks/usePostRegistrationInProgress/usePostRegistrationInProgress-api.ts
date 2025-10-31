import { api } from '@/api/api-client';
// Types
import { RegistrationInProgressDataPayload } from '../../business-types';

const postRegistrationInProgressURL = '/v2/businesses/registration/in-progress-data';

export const postRegistrationInProgress = async (payload: RegistrationInProgressDataPayload) => {
  const response = await api.post(postRegistrationInProgressURL, payload);
  return response.data;
}
