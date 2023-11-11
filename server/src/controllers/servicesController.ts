import Service from "../models/service";
import asyncHandler from "express-async-handler";
import { T_Request } from "../types/T_Request";
import { Response } from "express";
import { HydratedDocument } from "mongoose";

type Review = {
  author: { _id: string; username: string; name: string; avatar: string };
  reviewBody: string;
  rate: number;
};

export type T_Service = {
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

/* --user--  */

// @GET - private - /api/services
export const getServiceList = asyncHandler(async (req: T_Request, res: Response): Promise<void> => {
  const queryCurrentPage = req.query.page ? parseInt(req.query.page as string) : 1;
  const querySortByPrice = req.query.price || "desc";
  const queryLimit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  const priceSort = querySortByPrice === "desc" ? -1 : 1;

  const services: HydratedDocument<T_Service[]> | [] = (await Service.find()
    .populate({ path: "reviews.author", select: "_id username name" })
    .sort({ price: priceSort })
    .limit(queryLimit)
    .skip((queryCurrentPage - 1) * queryLimit)) as HydratedDocument<T_Service[]> | [];

  const servicesCount: number = await Service.find().count();

  const pageInTotal: number = Math.ceil(servicesCount / queryLimit);
  res.status(200).json({
    data: services,
    currentPage: queryCurrentPage,
    hasNextPage: queryCurrentPage >= pageInTotal || pageInTotal <= 0 ? false : true,
    totalPages: pageInTotal,
    lastPage: pageInTotal,
    servicesCount: servicesCount,
  });
});

// @GET - private - /api/services/:serviceId
export const getUserServicePreview = asyncHandler(async (req: T_Request, res: Response) => {
  const { serviceId } = req.params;
  const service: HydratedDocument<T_Service> | null = await Service.findById(serviceId).populate(
    "reviews.author",
    "_id username name email avatar"
  );

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  res.status(200).json(service);
});

/* --admin--  */

// @GET - private - /api/services/admin
export const getAdminServiceList = asyncHandler(
  async (req: T_Request, res: Response): Promise<void> => {
    const queryCurrentPage = req.query.page ? parseInt(req.query.page as string) : 1;
    const querySortByPrice = req.query.price || "desc";
    const queryLimit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const priceSort = querySortByPrice === "desc" ? -1 : 1;

    const services: HydratedDocument<T_Service[]> | [] = (await Service.find({})
      .populate({ path: "reviews.author", select: "_id username name" })
      .sort({ price: priceSort })
      .limit(queryLimit)
      .skip((queryCurrentPage - 1) * queryLimit)) as HydratedDocument<T_Service[]> | [];

    const servicesCount: number = await Service.find().count();

    const pageInTotal: number = Math.ceil(servicesCount / queryLimit);
    res.status(200).json({
      data: services,
      currentPage: queryCurrentPage,
      hasNextPage: queryCurrentPage >= pageInTotal || pageInTotal <= 0 ? false : true,
      totalPages: pageInTotal,
      lastPage: pageInTotal,
      servicesCount: servicesCount,
    });
  }
);

// @GET - private - /api/services/admin/:id
export const getService = asyncHandler(async (req: T_Request, res: Response): Promise<void> => {
  const { id: serviceId } = req.params;
  const service: HydratedDocument<T_Service> | null = await Service.findOne({
    serviceId,
  }).populate({ path: "reviews.author", select: "_id name username" });
  res.status(200).json(service);
});

// @PUT - private - /api/services/admin/:id

type NewServiceInfo = {
  name: string;
  description: string;
  imageLinks: string[];
  isAvailable: boolean;
  price: number;
};

export const editService = asyncHandler(async (req: T_Request, res: Response): Promise<void> => {
  const serviceId = req.params.serviceId;

  const { name, description, imageLinks, isAvailable, price }: NewServiceInfo = req.body;

  if ((!name || !description || imageLinks.length <= 0, price < 0)) {
    res.status(400);
    throw new Error("Invalid fields");
  }

  const updatedService = await Service.findById(serviceId);

  res.json(updatedService);
});

// @POST - private - /api/services/admin
export const createService = asyncHandler(async (req: T_Request, res: Response): Promise<void> => {
  const newServiceInfo: T_Service = req.body;
  const newService = await Service.create(newServiceInfo);
  res.status(201).json({ success: true, newService });
});
