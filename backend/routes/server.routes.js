import express from "express";
import createServerController from "../controllers/serverControllers/createServer.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import loadServerController from "../controllers/serverControllers/loadServer.controller.js";
import joinServerController from "../controllers/serverControllers/joinServer.controller.js";
import leaveServerController from "../controllers/serverControllers/leaveServer.controller.js";
import createChannelController from "../controllers/channelControllers/createChannel.controller.js";
import deleteChannelController from "../controllers/channelControllers/deleteChannel.controller.js";

const router = express.Router();

router.post("/create-server", verifyToken, createServerController);
router.get("/load-server/:serverId", verifyToken, loadServerController);
router.post("/join-server", verifyToken, joinServerController);
router.post("/leave-server/:serverId", verifyToken, leaveServerController);

// channels
router.post(
  "/channel/create-channel/:serverId",
  verifyToken,
  createChannelController,
);

router.delete(
  "/channel/delete-channel/:serverId/channel/:channelId",
  verifyToken,
  deleteChannelController,
);

export default router;
