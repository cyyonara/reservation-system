import axios from "axios";
import { QueryFunction } from "@tanstack/react-query";
import { A_Service } from "../hooks/useAdminServiceList";

export const getService: QueryFunction<A_Service, [string, { id: string }]> = async ({
   queryKey,
}): Promise<A_Service> => {
   const id = queryKey[1].id;
   const res = await axios.get<A_Service>(`/api/services/admin/${id}`);
   console.log(res.data);
   return res.data;
};
