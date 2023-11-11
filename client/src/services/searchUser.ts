import axios from "axios";
import { UserSearchResult } from "../hooks/useUserSearch";
import { QueryFunction } from "@tanstack/react-query";

export const searchUser: QueryFunction<UserSearchResult[], [string, string]> = async ({
   queryKey,
}): Promise<UserSearchResult[]> => {
   const keyword = queryKey[1];
   const res = await axios.get<UserSearchResult[]>(`/api/users/search?keyword=${keyword}`, {
      withCredentials: true,
   });
   return res.data;
};
