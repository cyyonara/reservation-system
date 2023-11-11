import { T_UserCredential, AccountStatus } from "../hooks/useGoogleSignIn";
import { UserCredential } from "firebase/auth";
import axios from "axios";

const isUserCredential = (data: T_UserCredential | AccountStatus): data is T_UserCredential => {
   return (data as T_UserCredential).email !== undefined;
};

export const googleSignIn = async (
   userCredential: UserCredential["user"]
): Promise<T_UserCredential | AccountStatus> => {
   const { email } = userCredential;
   const res = await axios.post<T_UserCredential | AccountStatus>(
      "/api/auth/google/sign-in",
      { email },
      { withCredentials: true }
   );

   if (isUserCredential(res.data)) {
      return res.data;
   }
   return res.data;
};
