import User from "../../model/user.model.js";

const removeFriendController = async (req, res) => {
  const userId = req.userId;
  const { friendId } = req.body;

  if (!userId || !friendId)
    return res.status(400).json({ success: false, message: "Missing fields" });

  try {
    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    res.status(200).json({ success: true, message: "Removed friend" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default removeFriendController;
