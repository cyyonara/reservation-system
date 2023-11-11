import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AdminSigninData } from "../pages/admin/AdminSignin";
import { AxiosError } from "axios";
import { adminSignin } from "../services/adminSignin";

export type AdminCredential = { _id: string; username: string; avatar: string };

export const useAdminSignin = (): UseMutationResult<
   AdminCredential,
   AxiosError<{ message: string }>,
   AdminSigninData
> => {
   return useMutation<AdminCredential, AxiosError<{ message: string }>, AdminSigninData>(
      ["admin-signin"],
      adminSignin
   );
};
