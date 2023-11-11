import { T_UserCredential } from "./useGoogleSignIn";
import { SignUpForm } from "../pages/user/UserSignUp";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { setupAccount } from "../services/setupAccount";

export type SetUpForm = SignUpForm & {
   avatar: string;
   isAdmin: boolean;
};

export const useSetup = (): UseMutationResult<
   T_UserCredential,
   AxiosError<{ message: string }>,
   SetUpForm
> => {
   return useMutation<T_UserCredential, AxiosError<{ message: string }>, SetUpForm>(setupAccount);
};
