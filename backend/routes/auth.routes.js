import express from "express";

import registerController from "../controllers/authControllers/register.controller.js";
import loginController from "../controllers/authControllers/login.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkAuthController from "../controllers/authControllers/checkAuth.controller.js";
import logoutController from "../controllers/authControllers/logout.controller.js";
import verifyUserController from "../controllers/authControllers/verifyUser.controller.js";
import forgotPasswordController from "../controllers/authControllers/forgotPassword.controller.js";
import resetPasswordController from "../controllers/authControllers/resetPassword.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/checkAuth", verifyToken, checkAuthController);
router.post("/logout", logoutController);
router.post("/verifyEmail", verifyUserController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

export default router;
