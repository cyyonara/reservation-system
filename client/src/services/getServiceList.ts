import { SearchFilter } from "../hooks/useAdminServiceList";
import { ServiceQueryResponse } from "../hooks/useAdminServiceList";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getServiceList: QueryFunction<ServiceQueryResponse, [string, SearchFilter]> = async ({
   queryKey,
}): Promise<ServiceQueryResponse> => {
   const { currentPage, filterByPrice } = queryKey[1];

   const serviceQuery = new URLSearchParams({
      page: currentPage.toString(),
      price: filterByPrice,
   });

   const res = await axios.get<ServiceQueryResponse>(`/api/services?${serviceQuery.toString()}`, {
      withCredentials: true,
   });

   return res.data;
};
