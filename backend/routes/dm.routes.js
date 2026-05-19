import express from "express";

import loadDmController from "../controllers/DmControllers/loadDm.controller";

const router = express.Router();

router.get(`/loadDmMessages/:friendId`, loadDmController);

export default router;
