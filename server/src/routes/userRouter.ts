import express, { IRouter } from "express";
import { protect } from "../middlewares/protect";
import { searchUser } from "../controllers/userController";

const router: IRouter = express.Router();

// @GET - private - /api/user/search
router.get("/search", protect, searchUser);

export default router;
