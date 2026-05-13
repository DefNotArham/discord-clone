import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import acceptFriendController from "../controllers/friendController/acceptFriend.controller.js";
import addFriendController from "../controllers/friendController/addFriend.controller.js";
import declineAddFriendController from "../controllers/friendController/declineAddfriend.controller.js";

const router = express.Router();

router.post("accept-frined", verifyToken, acceptFriendController);
router.post("add-frined", verifyToken, addFriendController);
router.post("decline-frined", verifyToken, declineAddFriendController);

export default router;
