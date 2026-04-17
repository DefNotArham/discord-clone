import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import changeStatusController from "../controllers/changeStatus.controller.js";
import editDisplayNameController from "../controllers/editDisplayName.controller.js";
import changeUsernameController from "../controllers/changeUsername.controller.js";
import changePasswordController from "../controllers/changePassword.controller.js";

const router = express.Router();

router.patch("/change-status", verifyToken, changeStatusController);
router.patch("/change-displayName", verifyToken, editDisplayNameController);
router.patch("/change-username", verifyToken, changeUsernameController);
router.patch("/change-password", verifyToken, changePasswordController);

export default router;
