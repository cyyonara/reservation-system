import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createService } from "../services/createService";

export type NewService = {
   serviceId: string;
   name: string;
   description: string;
   imageLinks: string[];
   isAvailable: boolean;
   price: number;
   reviews: string[];
};

export const useAddService = (): UseMutationResult<
   { success: boolean },
   AxiosError<{ message: string }>,
   NewService
> => {
   return useMutation<{ success: boolean }, AxiosError<{ message: string }>, NewService>(
      ["create-service"],
      createService
   );
};
