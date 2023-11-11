import express, { IRouter } from "express";
import { a_protect } from "../middlewares/a_protect";
import { getAllAdminChats, accessChat, getSingleChat } from "../controllers/chatController";

const router: IRouter = express.Router();

// @GET - private - /api/chats/admin
router.get("/admin", a_protect, getAllAdminChats);

// @POST - private - /api/chats/admin
router.post("/admin", a_protect, accessChat);

// @GET - private - /api/chats/admin/:chatId
router.get("/admin/:chatId", a_protect, getSingleChat);

export default router;
