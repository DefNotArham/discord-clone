import express from "express";

import registerController from "../controllers/register.controller.js";
import loginController from "../controllers/login.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkAuthController from "../controllers/checkAuth.controller.js";
import logoutController from "../controllers/logout.controller.js";
import verifyUserController from "../controllers/verifyUser.controller.js";
import forgotPasswordController from "../controllers/forgotPassword.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/checkAuth", verifyToken, checkAuthController);
router.post("/logout", logoutController);
router.post("/verifyEmail", verifyUserController);
router.post("/forgot-password", forgotPasswordController);

export default router;
