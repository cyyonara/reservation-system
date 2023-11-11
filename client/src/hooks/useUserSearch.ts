import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { searchUser } from "../services/searchUser";

export type UserSearchResult = {
   _id: string;
   name: string;
   username: string;
   email: string;
   avatar: string;
};

export const useUserSearch = (
   searchKeyWord: string
): UseQueryResult<UserSearchResult[], AxiosError<{ message: string }>> => {
   return useQuery(["search-user", searchKeyWord], searchUser, { enabled: false });
};
