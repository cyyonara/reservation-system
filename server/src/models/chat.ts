import mongoose, { Document } from "mongoose";

type D_Chat = Document & {
   users: mongoose.Schema.Types.ObjectId[];
   lastMessage: mongoose.Schema.Types.ObjectId | null;
};

const chatSchema = new mongoose.Schema<D_Chat>(
   {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      lastMessage: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Message",
      },
   },
   { timestamps: true }
);

const Chat = mongoose.model<D_Chat>("chat", chatSchema);

export default Chat;
