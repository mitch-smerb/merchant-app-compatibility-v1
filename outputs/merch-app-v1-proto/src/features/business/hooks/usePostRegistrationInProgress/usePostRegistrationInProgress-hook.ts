import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRegistrationInProgress } from "./usePostRegistrationInProgress-api";

import { RegistrationInProgressDataPayload } from "../../business-types";

export const usePostRegistrationInProgress = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegistrationInProgressDataPayload) => postRegistrationInProgress(payload),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({ queryKey: ['in-progress-data', variables.cioId] });
      client.invalidateQueries({ queryKey: ['in-progress-data'] });
    },
  });
}
