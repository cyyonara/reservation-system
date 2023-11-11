import axios, { AxiosError } from "axios";
import { SetUpForm } from "../hooks/useSetup";
import { T_UserCredential } from "../hooks/useGoogleSignIn";

export const setupAccount = async (values: SetUpForm): Promise<T_UserCredential> => {
   const res = await axios.post<T_UserCredential>("/api/auth/account/setup/sign-up", values, {
      withCredentials: true,
   });

   return res.data;
};
