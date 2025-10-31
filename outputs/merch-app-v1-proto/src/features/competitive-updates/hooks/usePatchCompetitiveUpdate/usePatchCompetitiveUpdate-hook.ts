import { useQueryClient, useMutation } from '@tanstack/react-query';
import { patchCompetitive } from './usePatchCompetitiveUpdate-api';

import { PatchRequest } from '../../competitive-updates-types';

export const usePatchCompetititveUpdate = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: PatchRequest) => patchCompetitive(payload),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({ queryKey: ['competitive-updates', variables.id] })
    }
  })
}
