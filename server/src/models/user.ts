import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";

type D_User = Document & {
   name: string;
   username: string;
   email: string;
   isAdmin: boolean;
   password: string;
   avatar: string;
};

const userSchema = new mongoose.Schema<D_User>(
   {
      name: {
         type: String,
         required: true,
      },
      username: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      isAdmin: {
         type: Boolean,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
         default:
            "https://firebasestorage.googleapis.com/v0/b/school-9c7f7.appspot.com/o/defaults%2Fuser.png?alt=media&token=0b13baaa-0c83-4781-b439-8e31f678c765",
      },
   },
   { timestamps: true }
);

const User = mongoose.model<D_User>("User", userSchema);

export default User;
