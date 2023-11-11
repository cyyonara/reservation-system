import mongoose, { Document } from "mongoose";

type D_Message = Document & {
   chatId: mongoose.Schema.Types.ObjectId;
   sender: mongoose.Schema.Types.ObjectId;
   receiver: mongoose.Schema.Types.ObjectId;
   content: string;
};

const messageSchema = new mongoose.Schema<D_Message>(
   {
      chatId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Chat",
      },
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      receiver: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      content: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const Message = mongoose.model<D_Message>("Message", messageSchema);

export default Message;
