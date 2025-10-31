import { api } from '@/api/api-client';
import { UpgradePayload } from '../../business-types';

const patchUpgradeBusinessURL = '/v2/businesses/upgrade';

export const patchUpgradeBusiness = async (
  payload: UpgradePayload,
  headers: Record<string, string> = {}
) => {
  const response = await api.patch(patchUpgradeBusinessURL, payload, { headers });
  return response.data;
}
