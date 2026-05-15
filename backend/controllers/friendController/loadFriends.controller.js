import User from "../../model/user.model.js";

const loadFriendsController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, friends: user.friends });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Server error" });
  }
};
export default loadFriendsController;
