import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import acceptFriendController from "../controllers/friendController/acceptFriend.controller.js";
import addFriendController from "../controllers/friendController/addFriend.controller.js";
import declineAddFriendController from "../controllers/friendController/declineAddfriend.controller.js";
import getFriendRequestsController from "../controllers/friendController/getFriendReqests.controller.js";
import loadFriendsController from "../controllers/friendController/loadFriends.controller.js";
import removeFriendController from "../controllers/friendController/removeFriend.controller.js";

const router = express.Router();

router.post("/accept-friend", verifyToken, acceptFriendController);
router.post("/add-friend", verifyToken, addFriendController);
router.post("/decline-friend", verifyToken, declineAddFriendController);
router.get("/get-friendRequests", verifyToken, getFriendRequestsController);
router.get("/get-friends", verifyToken, loadFriendsController);
router.delete("/remove-friend", verifyToken, removeFriendController);

export default router;
