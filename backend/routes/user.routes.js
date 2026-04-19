import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import changeStatusController from "../controllers/userControllers/changeStatus.controller.js";
import editDisplayNameController from "../controllers/userControllers/editDisplayName.controller.js";
import changeUsernameController from "../controllers/userControllers/changeUsername.controller.js";
import changePasswordController from "../controllers/userControllers/changePassword.controller.js";
import deleteAccountController from "../controllers/userControllers/deleteAccount.controller.js";

const router = express.Router();

router.patch("/change-status", verifyToken, changeStatusController);
router.patch("/change-displayName", verifyToken, editDisplayNameController);
router.patch("/change-username", verifyToken, changeUsernameController);
router.patch("/change-password", verifyToken, changePasswordController);
router.delete("/delete-account", verifyToken, deleteAccountController);

export default router;
