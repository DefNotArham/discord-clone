import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import changeStatusController from "../controllers/changeStatus.controller.js";
import editDisplayNameController from "../controllers/editDisplayName.controller.js";

const router = express.Router();

router.post("/change-status", verifyToken, changeStatusController);
router.post("/change-displayName", verifyToken, editDisplayNameController);

export default router;
