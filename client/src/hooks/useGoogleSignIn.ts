import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { googleSignIn } from "../services/googleSignIn";
import { UserCredential } from "firebase/auth";

export type T_UserCredential = {
   username: string;
   email: string;
   name: string;
   avatar: string;
};

export type AccountStatus = {
   hasExistingAccount: boolean;
};

export const useGoogleSignIn = (): UseMutationResult<
   T_UserCredential | AccountStatus,
   Error,
   UserCredential["user"]
> => {
   return useMutation<T_UserCredential | AccountStatus, Error, UserCredential["user"]>(
      googleSignIn
   );
};
