import { T_Chat } from "../hooks/useGetAdminMessages";
import axios from "axios";

export const getAdminMessages = async (): Promise<T_Chat[]> => {
   const res = await axios.get<T_Chat[]>("/api/chats/admin", { withCredentials: true });
   return res.data;
};
