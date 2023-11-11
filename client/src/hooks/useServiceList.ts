import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getServiceList } from "../services/getServiceList";

type Review = {
  author: string;
  reviewBody: string;
  rate: number;
};

export type A_Service = {
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

export type SearchFilter = {
  filterByPrice: "asc" | "desc";
  currentPage: number;
};

export type ServiceQueryResponse = {
  data: A_Service[];
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  lastPage: number;
  servicesCount: number;
};

export const useServiceList = ({
  filterByPrice = "desc",
  currentPage = 1,
}: SearchFilter): UseQueryResult<ServiceQueryResponse, AxiosError<{ message: string }>> => {
  return useQuery<ServiceQueryResponse, AxiosError<{ message: string }>>(
    ["a-service-list", { filterByPrice, currentPage }],
    getServiceList as any
  );
};
