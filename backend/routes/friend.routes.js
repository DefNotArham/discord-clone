import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import acceptFriendController from "../controllers/friendController/acceptFriend.controller.js";
import addFriendController from "../controllers/friendController/addFriend.controller.js";
import declineAddFriendController from "../controllers/friendController/declineAddfriend.controller.js";
import getFriendRequestsController from "../controllers/friendController/getFriendReqests.controller.js";

const router = express.Router();

router.post("/accept-friend", verifyToken, acceptFriendController);
router.post("/add-friend", verifyToken, addFriendController);
router.post("/decline-friend", verifyToken, declineAddFriendController);
router.get("/get-friendRequests", verifyToken, getFriendRequestsController);

export default router;
