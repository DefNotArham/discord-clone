import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import changeStatusController from "../controllers/changeStatus.controller.js";

const router = express.Router();

router.post("/change-status", verifyToken, changeStatusController);

export default router;
