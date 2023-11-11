import axios from "axios";
import { DirectSignInData, UserCredential } from "../hooks/useSignIn";

export const signIn = async ({ email, password }: DirectSignInData): Promise<UserCredential> => {
   const res = await axios.post<UserCredential>(
      "/api/auth/sign-in",
      { email, password },
      { withCredentials: true }
   );
   return res.data;
};
