import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRegistration } from "./usePostRegisterBusiness-api";

import { RegistrationInProgressDataPayload } from "../../business-types";

export const usePostRegisterBusiness = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => postRegistration(payload),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({ queryKey: ['registration', variables.id] });
      client.invalidateQueries({ queryKey: ['registration'] });
    },
  });
}
