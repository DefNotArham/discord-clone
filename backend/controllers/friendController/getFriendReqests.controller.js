import User from "../../model/user.model.js";

const getFriendRequestsController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(
      "friendRequests",
      "-password",
    );

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, friendRequests: user.friendRequests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default getFriendRequestsController;
