import Chat from "../models/chat";
import asycnHandler from "express-async-handler";
import { T_Request } from "../types/T_Request";
import { Response } from "express";
import mongoose, { HydratedDocument } from "mongoose";
import Message from "../models/message";

/* admin */
type C_User = { _id: string; username: string; name: string; email: string; avatar: string };

type T_Chat = {
   _id: string;
   users: C_User[];
   lastMessage?: {
      sender: C_User;
      receiver: C_User;
      content: string;
   };
   createdAt: Date;
   updatedAt: Date;
   __v: number;
};

// @GET - private - /api/chats/admin
export const getAllAdminChats = asycnHandler(async (req: T_Request, res: Response) => {
   const chats: HydratedDocument<T_Chat[]> | [] = (await Chat.find()
      .sort({ updatedAt: -1 })
      .populate("users", "_id username name email avatar")
      .populate("lastMessage")) as HydratedDocument<T_Chat[]> | [];

   res.status(200).json(chats);
});

// @POST - private - /api/chats/admin
export const accessChat = asycnHandler(async (req: T_Request, res: Response): Promise<void> => {
   const { _id }: { _id: string } = req.body;

   const isChatExist: HydratedDocument<T_Chat> | null = await Chat.findOne({
      users: { $elemMatch: { $eq: _id } },
   }).populate("users", "_id username name email");

   if (isChatExist) {
      res.status(200).json(isChatExist);
   } else {
      const objectId = new mongoose.Types.ObjectId(_id);
      const chat = await Chat.create({ users: [objectId, req.admin!._id] });

      const newChat: HydratedDocument<T_Chat> | null = await Chat.findById(
         chat._id.toString()
      ).populate("users", "_id username name email");

      res.status(201).json(newChat);
   }
});

// @GET - private - /api/chats/admin/:chatId
type T_Message = { chat: string; sender: C_User; receiver: C_User; content: string };

export const getSingleChat = asycnHandler(async (req: T_Request, res: Response) => {
   const { chatId } = req.params;

   const chat: HydratedDocument<T_Chat> | null = await Chat.findById(chatId).populate(
      "users",
      "_id username name email avatar"
   );

   if (!chat) {
      res.status(404);
      throw new Error("Chat not found");
   }

   const messages: HydratedDocument<T_Message[]> | [] = (await Message.find({
      chatId: new mongoose.Types.ObjectId(chat._id),
   })
      .sort({ createdAt: 1 })
      .populate("sender receiver", "_id username email name avatar isAdmin")) as
      | HydratedDocument<T_Message[]>
      | [];

   res.status(200).json({ chatInfo: chat, messages: messages });
});
