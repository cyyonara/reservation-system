import { T_Chat } from "./useGetAdminMessages";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { accessChat } from "../services/accessChat";

export type SelectedUser = { _id: string };

export const useAccessChat = (): UseMutationResult<
   T_Chat,
   AxiosError<{ message: string }>,
   SelectedUser
> => {
   return useMutation<T_Chat, AxiosError<{ message: string }>, SelectedUser>(
      ["access-chat"],
      accessChat
   );
};
