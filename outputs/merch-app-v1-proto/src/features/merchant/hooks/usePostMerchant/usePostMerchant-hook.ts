import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMerchant } from "./usePostMerchant-api";

import { CreateRequest } from "../../merchant-types";

export const usePostMerchant = (id: number) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRequest) => postMerchant(payload),
    onSuccess: (_data) => {
      client.invalidateQueries({ queryKey: ['merchant', id] });
    },
  });
}
