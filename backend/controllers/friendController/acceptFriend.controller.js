import User from "../../model/user.model.js";

const acceptFriendController = async (req, res) => {
  try {
    const userId = req.userId;
    const { senderId } = req.body;

    if (!userId || !senderId)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await User.findByIdAndUpdate(userId, {
      $push: { friends: senderId },
      $pull: { friendRequests: senderId },
    });

    await User.findByIdAndUpdate(senderId, {
      $push: { friends: userId },
      $pull: { sentRequests: userId },
    });

    res.status(200).json({ success: true, message: "Friend added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default acceptFriendController;
