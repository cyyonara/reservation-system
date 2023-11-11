import express, { IRouter } from "express";
import { a_protect } from "../middlewares/a_protect";
import { sendMessage } from "../controllers/messageController";

const router: IRouter = express.Router();

// @POST - private - /api/messages/admin
router.post("/admin", a_protect, sendMessage);

export default router;
