import express from "express";
import createServerController from "../controllers/serverControllers/createServer.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import loadServerController from "../controllers/serverControllers/loadServer.controller.js";
import joinServerController from "../controllers/serverControllers/joinServer.controller.js";
import leaveServerController from "../controllers/serverControllers/leaveServer.controller.js";

const router = express.Router();

router.post("/create-server", verifyToken, createServerController);
router.get("/load-server/:serverId", verifyToken, loadServerController);
router.post("/join-server", verifyToken, joinServerController);
router.post("/leave-server/:serverId", verifyToken, leaveServerController);

export default router;
