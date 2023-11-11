import axios from "axios";
import { AdminCredential } from "../hooks/useAdminSignin";
import { AdminSigninData } from "../pages/admin/AdminSignin";

export const adminSignin = async (signInData: AdminSigninData): Promise<AdminCredential> => {
   const res = await axios.post<AdminCredential>("/api/auth/admin/sign-in", signInData, {
      withCredentials: true,
   });
   return res.data;
};
