import asyncHandler from "express-async-handler";
import { T_Request } from "../types/T_Request";
import { Response } from "express";
import User from "../models/user";
import { HydratedDocument } from "mongoose";

// @GET - private - /api/users/search
export type T_User = { _id: string; name: string; username: string; email: string; avatar: string };

export const searchUser = asyncHandler(async (req: T_Request, res: Response): Promise<void> => {
   const keyword = req.query.keyword;
   const filter = [
      { name: { $regex: keyword, $options: "i" } },
      { username: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
   ];

   const users: HydratedDocument<T_User> | [] = (await User.find({
      $or: filter,
      isAdmin: false,
   })
      .select("_id name username email avatar")
      .limit(5)
      .sort({ createdAt: -1 })) as HydratedDocument<T_User> | [];

   res.status(200).json(users);
});
