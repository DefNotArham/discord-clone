import User from "../../model/user.model.js";

const removeFriendController = async (req, res) => {
  const userId = req.userId;
  const { friendId } = req.body;
  try {
    if (userId || senderId)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await User.findByIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });

    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: userId },
    });

    res.status(200).json({ success: true, message: "Removed friend" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default removeFriendController;
