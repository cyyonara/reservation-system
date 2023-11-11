import { T_ServicePreview } from "../hooks/useServicePreview";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getServicePreview: QueryFunction<T_ServicePreview, [string, string]> = async ({
   queryKey,
}): Promise<T_ServicePreview> => {
   const res = await axios.get<T_ServicePreview>(`/api/services/${queryKey[1]}`);
   return res.data;
};
