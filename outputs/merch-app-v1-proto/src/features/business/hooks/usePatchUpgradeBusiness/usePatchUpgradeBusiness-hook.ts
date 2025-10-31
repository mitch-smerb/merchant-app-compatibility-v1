import { useQueryClient, useMutation } from "@tanstack/react-query";
import { UpgradePayload } from "../../business-types";
import { patchUpgradeBusiness } from './usePatchUpgradeBusiness-api';

export const usePatchUpgradeBusiness = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (
      { payload, headers }: { payload: UpgradePayload, headers: Record<string, string> }
    ) => patchUpgradeBusiness(payload, headers),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({ queryKey: ['upgradeBusiness', variables.headers] });
      client.invalidateQueries({ queryKey: ['upgradeBusiness'] });
    },
  });
}
