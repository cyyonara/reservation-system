import { AxiosError } from "axios";
import { SignUpForm } from "../pages/user/UserSignUp";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signUp } from "../services/signUp";
import { T_UserCredential } from "./useGoogleSignIn";

export type SignUpData = SignUpForm & { isAdmin: boolean };

export const useSignUp = (): UseMutationResult<
   T_UserCredential,
   AxiosError<{ message: string }>,
   SignUpData
> => {
   return useMutation<T_UserCredential, AxiosError<{ message: string }>, SignUpData>(
      ["sign-up"],
      signUp
   );
};
