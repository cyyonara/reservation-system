import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getChat } from "../services/getChat";

export type T_Message = {
   _id: string;
   chat: string;
   sender: C_User;
   receiver: C_User;
   content: string;
};

type C_User = {
   _id: string;
   username: string;
   isAdmin: boolean;
   name: string;
   email: string;
   avatar: string;
};

export type T_SingleChat = {
   chatInfo: {
      _id: string;
      users: C_User[];
      lastMessage: {
         sender: C_User;
         receiver: C_User;
         content: string;
      } | null;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
   };
   messages: T_Message[];
};

export const useGetChat = (
   chatID: string
): UseQueryResult<T_SingleChat, AxiosError<{ message: string }>> => {
   return useQuery<T_SingleChat, AxiosError<{ message: string }>>(
      ["single-chat", chatID],
      getChat as never
   );
};
