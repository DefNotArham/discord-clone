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
import dmRoutes from "./routes/dm.routes.js";

import Message from "./model/message.model.js";
import DM from "./model/dm.model.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const allowedOrigins = ["http://localhost:5173", "http://localhost:4173"];

const io = new SocketServer(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

const PORT = process.env.PORT;

app.use(
  cors({
    origin: allowedOrigins,
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
app.use("/dm", dmRoutes);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Channel chat
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

  // Private DMs
  socket.on("privateDm", ({ userId, friendId }) => {
    const roomId = [userId, friendId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("leavePrivateDm", ({ userId, friendId }) => {
    const roomId = [userId, friendId].sort().join("_");
    socket.leave(roomId);
  });

  socket.on("sendDmMessage", async (DmData) => {
    try {
      const dm = new DM({
        to: DmData.to,
        from: DmData.from._id,
        content: DmData.content,
      });
      await dm.save();
      const populatedDm = await DM.findById(dm._id)
        .populate("to", "username displayName")
        .populate("from", "username displayName");

      const roomId = [DmData.from._id, DmData.to].sort().join("_");
      io.to(roomId).emit("receiveDM", populatedDm);
    } catch (error) {
      console.log(error);
    }
  });
});

connectDb();

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
