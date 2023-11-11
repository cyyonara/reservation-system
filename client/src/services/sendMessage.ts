import { T_Message } from "../hooks/useGetChat";
import axios from "axios";
import { T_SendMessage } from "../hooks/useSendMessage";

export const sendMessage = async (newMessage: T_SendMessage): Promise<T_Message> => {
   const res = await axios.post<T_Message>("/api/messages/admin", newMessage, {
      withCredentials: true,
   });
   return res.data;
};
