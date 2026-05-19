import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import loadDmController from "../controllers/DmControllers/loadDm.controller.js";

const router = express.Router();

router.get(`/loadDmMessages/:friendId`, verifyToken, loadDmController);

export default router;
