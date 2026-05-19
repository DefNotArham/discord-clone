import User from "../../model/user.model.js";

const declineAddFriendController = async (req, res) => {
  try {
    const userId = req.userId;
    const { senderId } = req.body;

    if (!userId || !senderId)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await User.findByIdAndUpdate(userId, {
      $pull: { friendRequests: senderId },
    });

    await User.findByIdAndUpdate(senderId, {
      $pull: { sentRequests: userId },
    });

    res.status(200).json({ success: true, message: "Friend request declined" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default declineAddFriendController;
