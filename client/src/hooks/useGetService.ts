import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { A_Service } from "./useAdminServiceList";
import { getService } from "../services/getService";
import { AxiosError } from "axios";

export const useGetService = ({
   id,
}: {
   id: string;
}): UseQueryResult<A_Service, AxiosError<{ message: string }>> => {
   return useQuery<A_Service, AxiosError<{ message: string }>>(
      ["service", { id }],
      getService as any
   );
};
