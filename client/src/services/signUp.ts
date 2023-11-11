import axios from "axios";
import { SignUpData } from "../hooks/useSignUp";
import { T_UserCredential } from "../hooks/useGoogleSignIn";

export const signUp = async (formData: SignUpData): Promise<T_UserCredential> => {
   const res = await axios.post<T_UserCredential>("/api/auth/sign-up", formData, {
      withCredentials: true,
   });
   return res.data;
};
