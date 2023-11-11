import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
   try {
      await mongoose.connect(process.env.CONN_STRING as string);
      console.log("connected to database");
   } catch (err) {
      console.log(err);
   }
};
