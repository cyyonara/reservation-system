import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { T_Message } from "./useGetChat";
import { AxiosError } from "axios";
import { sendMessage } from "../services/sendMessage";

export type T_SendMessage = { chatId: string; content: string; receiver: string };

export const useSendMessage = (): UseMutationResult<
   T_Message,
   AxiosError<{ message: string }>,
   T_SendMessage
> => {
   return useMutation<T_Message, AxiosError<{ message: string }>, T_SendMessage>(
      ["send-message"],
      sendMessage
   );
};
