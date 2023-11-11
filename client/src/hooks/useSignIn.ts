import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signIn } from "../services/signIn";
import { AxiosError } from "axios";

export type DirectSignInData = {
   email: string;
   password: string;
};

export type UserCredential = {
   name: string;
   username: string;
   email: string;
   avatar: string;
};

export const useSignIn = (): UseMutationResult<
   UserCredential,
   AxiosError<{ message: string }>,
   DirectSignInData
> => {
   return useMutation<UserCredential, AxiosError<{ message: string }>, DirectSignInData>(
      ["sign-in"],
      signIn
   );
};
