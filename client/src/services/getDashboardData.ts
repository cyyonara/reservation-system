import axios from "axios";
import { T_DashboardData } from "../hooks/useDashboardData";

export const getDashboardData = async (): Promise<T_DashboardData> => {
  const res = await axios.get<T_DashboardData>("/api/dashboard", { withCredentials: true });
  return res.data;
};
