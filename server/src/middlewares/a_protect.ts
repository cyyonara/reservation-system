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

export const a_protect = async (
   req: T_Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   if (req.cookies.a_jwt) {
      try {
         const { _id }: Payload = jwt.verify(
            req.cookies.a_jwt,
            process.env.JWT_SECRET as string
         ) as Payload;

         const user: HydratedDocument<ExtractedUser> | null = (await User.findOne({
            _id,
            isAdmin: true,
         }).select("-password")) as HydratedDocument<ExtractedUser> | null;

         if (!user) throw new Error();
         req.admin = user;
         next();
      } catch (err) {
         res.status(401).clearCookie("a_jwt").json({ message: "Invalid Token" });
      }
   } else {
      res.status(401).clearCookie("a_jwt").json({ message: "Token required" });
   }
};
