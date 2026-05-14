import User from "../../model/user.model.js";

const addFriendController = async (req, res) => {
  try {
    // const { targetUserId } = req.body;
    const { targetUsername } = req.body;
    const senderId = req.userId;

    if (!targetUsername)
      return res
        .status(400)
        .json({ success: false, message: "Enter the username" });

    if (!senderId)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const sender = await User.findById(senderId);
    const target = await User.findOne({ username: targetUsername });

    if (!target || !sender)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const targetUserId = target._id;

    if (target._id.toString() === senderId)
      return res
        .status(400)
        .json({ success: false, message: "You can't add your self" });

    if (sender.friends.some((id) => id.toString() === targetUserId.toString()))
      return res
        .status(400)
        .json({ success: false, message: "Already friends" });

    if (
      target.friendRequests.some((id) => id.toString() === senderId.toString())
    )
      return res
        .status(400)
        .json({ success: false, message: "Request already sent" });

    await User.findByIdAndUpdate(targetUserId, {
      $push: { friendRequests: senderId },
    });

    await User.findByIdAndUpdate(senderId, {
      $push: { sentRequests: targetUserId },
    });

    const newFriendReq = await User.findById(targetUserId).select("username");

    res.status(200).json({
      success: true,
      message: "Friend request sent",
      newFriendReq,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default addFriendController;
