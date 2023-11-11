import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/authRouter";
import serviceRouter from "./routes/serviceRouter";
import chatRouter from "./routes/chatRouter";
import userRouter from "./routes/userRouter";
import messageRouter from "./routes/messageRouter";
import dashboardRouter from "./routes/dashboardRouter";
import { connect } from "./config/connect";
import { notfound, errorHandler } from "./middlewares/errorMiddleware";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT || 4001;

app.use(cors({ credentials: true, origin: "*" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/services", serviceRouter);
app.use("/api/chats", chatRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/messages", messageRouter);

app.use(notfound);
app.use(errorHandler);

connect();
httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
