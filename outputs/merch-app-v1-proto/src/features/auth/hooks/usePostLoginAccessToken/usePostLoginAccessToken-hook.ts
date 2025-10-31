import { useMutation } from "@tanstack/react-query";
import { postLoginAccessToken } from "./usePostLoginAccessToken-api";
import { useAuthTokenStore } from "../";

export const usePostLoginAccessToken = () => {
  const { setToken } = useAuthTokenStore();

  return useMutation({
    mutationFn: (payload?: { email: string }) => postLoginAccessToken(payload),
    onSuccess: (_data) => {
      setToken(_data);
    },
  });
}
