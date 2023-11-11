import { Request } from "express";
import { ExtractedUser } from "../middlewares/protect";

export type T_Request = Request & {
  user?: ExtractedUser;
  admin?: ExtractedUser;
};
