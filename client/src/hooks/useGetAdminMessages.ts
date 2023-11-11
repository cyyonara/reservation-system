import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAdminMessages } from "../services/getAdminMessages";

type C_User = { _id: string; username: string; name: string; email: string; avatar: string };

export type T_Chat = {
   _id: string;
   users: C_User[];
   lastMessage: {
      sender: C_User;
      receiver: C_User;
      content: string;
   };
   createdAt: Date;
   updatedAt: Date;
   __v: number;
};

export const useGetAdminMessages = (): UseQueryResult<
   T_Chat[],
   AxiosError<{ message: string }>
> => {
   return useQuery<T_Chat[], AxiosError<{ message: string }>>(["admin-messages"], getAdminMessages);
};
