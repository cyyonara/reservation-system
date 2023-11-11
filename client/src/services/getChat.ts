import axios from "axios";
import { T_SingleChat } from "../hooks/useGetChat";
import { QueryFunction } from "@tanstack/react-query";

export const getChat: QueryFunction<T_SingleChat, [string, string]> = async ({
   queryKey,
}): Promise<T_SingleChat> => {
   const res = await axios.get<T_SingleChat>(`/api/chats/admin/${queryKey[1]}`);
   return res.data;
};
