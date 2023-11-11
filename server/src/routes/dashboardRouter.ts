import express, { IRouter } from "express";
import { a_protect } from "../middlewares/a_protect";
import { getDashboardData } from "../controllers/dashboardController";

const router: IRouter = express.Router();

router.get("/", a_protect, getDashboardData);

export default router;
