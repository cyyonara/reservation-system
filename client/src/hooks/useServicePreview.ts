import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getServicePreview } from "../services/getServicePreview";

type Review = {
   author: { _id: string; name: string; username: string; email: string; avatar: string };
   reviewBody: string;
   rate: number;
};

export type T_ServicePreview = {
   _id: string;
   serviceId: string;
   name: string;
   description: string;
   imageLinks: string[];
   isAvailable: boolean;
   price: number;
   reviews: Review[];
   createdAt: Date;
   updatedAt: Date;
   __v: number;
};

export const useServicePreview = (
   _id: string
): UseQueryResult<T_ServicePreview, AxiosError<{ message: string }>> => {
   return useQuery<T_ServicePreview, AxiosError<{ message: string }>>(
      ["service-preview", _id],
      getServicePreview as never
   );
};
