import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server as SocketServer } from "socket.io";
import http from "http";

import connectDb from "./db/connectDb.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import serverRoutes from "./routes/server.routes.js";
import messageRoutes from "./routes/message.routes.js";
import friendRoutes from "./routes/friend.routes.js";

import Message from "./model/message.model.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/server", serverRoutes);
app.use("/message", messageRoutes);
app.use("/friend", friendRoutes);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("join_channel", (channelId) => {
    socket.join(channelId);
  });

  socket.on("leave_channel", (channelId) => {
    socket.leave(channelId);
  });

  socket.on("send_message", async (messageData) => {
    try {
      const message = new Message({
        channelId: messageData.channelId,
        content: messageData.content,
        sender: messageData.user,
      });

      await message.save();

      const populatedMessage = await Message.findById(message._id).populate(
        "sender",
        "username",
      );

      io.to(messageData.channelId).emit("receive_message", populatedMessage);
    } catch (error) {
      console.log(error);
    }
  });
});

connectDb();

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
