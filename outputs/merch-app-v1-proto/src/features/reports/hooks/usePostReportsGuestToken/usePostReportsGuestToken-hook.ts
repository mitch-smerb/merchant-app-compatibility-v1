import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReportsGuestToken } from "./usePostReportsGuestToken-api";

import { ReportsGuestTokenRequest } from "../../reports-types";

export const usePostReportsGuestToken = (id: number) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReportsGuestTokenRequest) => postReportsGuestToken(payload, id),
    onSuccess: (_data) => {
      client.invalidateQueries({ queryKey: ['reports-dashboard', id] });
    },
  });
}
