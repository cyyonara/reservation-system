import axios from "axios";
import { SelectedUser } from "../hooks/useAccessChat";
import { T_Chat } from "../hooks/useGetAdminMessages";

export const accessChat = async ({ _id }: SelectedUser): Promise<T_Chat> => {
   const res = await axios.post<T_Chat>("/api/chats/admin", { _id }, { withCredentials: true });
   return res.data;
};
