import User from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import { Response, NextFunction } from "express";
import { T_Request } from "../types/T_Request";

export type ExtractedUser = {
   _id: string;
   name: string;
   username: string;
   email: string;
   avatar: string;
   isAdmin: boolean;
   createdAt: Date;
   updatedAt: Date;
   __v: number;
};

type Payload = JwtPayload & { _id: string };

export const protect = async (req: T_Request, res: Response, next: NextFunction): Promise<void> => {
   if (req.cookies.jwt) {
      try {
         const { _id }: Payload = jwt.verify(
            req.cookies.jwt,
            process.env.JWT_SECRET as string
         ) as Payload;

         const user: HydratedDocument<ExtractedUser> | null = (await User.findOne({
            _id,
            isAdmin: false,
         }).select("-password")) as HydratedDocument<ExtractedUser> | null;

         if (!user) throw new Error();
         req.user = user;
         next();
      } catch (err) {
         res.status(401).clearCookie("jwt").json({ message: "Invalid Token" });
      }
   } else {
      res.status(401).clearCookie("jwt").json({ message: "Token required" });
   }
};
