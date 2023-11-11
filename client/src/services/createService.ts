import { NewService } from "../hooks/useAddService";
import axios from "axios";

export const createService = async (newService: NewService): Promise<{ success: boolean }> => {
   const res = await axios.post<{ success: boolean }>("/api/services/admin", newService, {
      withCredentials: true,
   });
   return res.data;
};
