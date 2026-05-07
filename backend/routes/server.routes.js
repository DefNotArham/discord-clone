import express from "express";
import createServerController from "../controllers/serverControllers/createServer.controller.js";
import verifyToken from "../middleware/verifyToken.js";

// Server
import loadServerController from "../controllers/serverControllers/loadServer.controller.js";
import joinServerController from "../controllers/serverControllers/joinServer.controller.js";
import leaveServerController from "../controllers/serverControllers/leaveServer.controller.js";
import getServersController from "../controllers/serverControllers/getServers.controller.js";
import loadMembersController from "../controllers/serverControllers/loadMembers.controller.js";
import editServerName from "../controllers/serverControllers/editServerName.controller.js";

// Channel
import createChannelController from "../controllers/channelControllers/createChannel.controller.js";
import deleteChannelController from "../controllers/channelControllers/deleteChannel.controller.js";
import loadChannelController from "../controllers/channelControllers/loadChannel.controller.js";
import editChannelController from "../controllers/channelControllers/editChannelName.controller.js";
import getChannelsController from "../controllers/channelControllers/getChannels.controller.js";

const router = express.Router();

router.post("/create-server", verifyToken, createServerController);
router.get("/load-server/:serverId", verifyToken, loadServerController);
router.post("/join-server", verifyToken, joinServerController);
router.post("/leave-server/:serverId", verifyToken, leaveServerController);
router.get("/get-servers", verifyToken, getServersController);
router.get("/get-members/:serverId", verifyToken, loadMembersController);
router.patch("/editServername/:serverId", verifyToken, editServerName);

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

router.get(
  "/channel/load-channel/:serverId/channel/:channelId",
  verifyToken,
  loadChannelController,
);

router.patch(
  "/channel/edit-channelName/:serverId/channel/:channelId",
  verifyToken,
  editChannelController,
);

router.get(
  "/channel/get-channels/:serverId",
  verifyToken,
  getChannelsController,
);

export default router;
