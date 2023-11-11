import User from "../models/user";
import Reservation from "../models/reservation";
import asyncHandler from "express-async-handler";
import { Response } from "express";
import { T_Request } from "../types/T_Request";

export const getDashboardData = asyncHandler(
  async (req: T_Request, res: Response): Promise<void> => {
    const activeUserCount = await User.find({ isAdmin: false }).count().exec();
    const pendingReservations = await Reservation.find({ isPending: true }).count().exec();
    res.json({ activeUser: activeUserCount, pendingReservations });
  }
);
