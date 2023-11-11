import Message from "../models/message";
import Chat from "../models/chat";
import { T_Request } from "../types/T_Request";
import { Response } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @POST - private - /api/messages/admin
type NewMessageData = { chatId: string; content: string; receiver: string };

export const sendMessage = asyncHandler(async (req: T_Request, res: Response): Promise<void> => {
   const { chatId, content, receiver }: NewMessageData = req.body;

   const chatObjectId = new mongoose.Types.ObjectId(chatId);

   let newMessage = await Message.create({
      chatId: chatObjectId,
      sender: req.admin!._id,
      content,
      receiver,
   });

   await Chat.findByIdAndUpdate(newMessage.chatId, { lastMessage: newMessage._id });

   newMessage = await newMessage.populate(
      "sender receiver",
      "_id isAdmin username name email avatar"
   );

   res.status(201).json(newMessage);
});
