import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReportsLogout } from "./usePostReportsLogout-api";
import { useReportsAuthStore } from '../';

export const usePostReportsLogout = () => {
  const { logout } = useReportsAuthStore();

  return useMutation({
    mutationFn: postReportsLogout,
    onSuccess: (_data) => {
      logout();
    },
  });
}
