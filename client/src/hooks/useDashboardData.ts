import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDashboardData } from "../services/getDashboardData";

export type T_DashboardData = { activeUser: number; pendingReservations: number };

export const useDashboardData = (): UseQueryResult<
  T_DashboardData,
  AxiosError<{ message: string }>
> => {
  return useQuery(["dashboard"], getDashboardData);
};
