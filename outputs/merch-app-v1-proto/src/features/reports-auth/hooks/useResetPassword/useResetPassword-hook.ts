import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postResetPasswordEmail } from "./useResetPassword-api";

import { ResetPassword } from "../../reports-auth-types";

export const useResetPassword = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, headers }: { payload: ResetPassword, headers: Record<string, string> }) => postResetPasswordEmail(payload, headers),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({ queryKey: ['reports-auth', _data.data.merchantLoginId] });
    },
  });
}
