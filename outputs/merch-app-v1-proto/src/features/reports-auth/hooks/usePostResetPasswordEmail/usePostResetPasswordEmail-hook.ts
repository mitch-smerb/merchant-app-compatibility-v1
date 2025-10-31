import { useMutation } from "@tanstack/react-query";
import { postResetPasswordEmail } from "./usePostResetPasswordEmail-api";
import { PostResetPasswordEmail } from '../../reports-auth-types';

export const usePostResetPasswordEmail = () => useMutation({
    mutationFn: (payload: PostResetPasswordEmail) => postResetPasswordEmail(payload),
  });
