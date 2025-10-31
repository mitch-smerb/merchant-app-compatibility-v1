import { useMutation } from "@tanstack/react-query";
import { postReportsLogin } from "./usePostReportsLogin-api";
import { useReportsAuthStore } from '../';
import { ReportsLoginRequest } from "../../reports-auth-types";

export const usePostReportsLogin = () => {
  const { setAuth } = useReportsAuthStore();

  return useMutation({
    mutationFn: (payload: ReportsLoginRequest) => postReportsLogin(payload),
    onSuccess: (_data) => {
      window.localStorage.persistedState = JSON.stringify({ authToken: _data });
      setAuth(_data);
    },
  });
}
