import User from "../../model/user.model.js";
import Server from "../../model/server.model.js";

const loadServerController = async (req, res) => {
  const { serverId } = req.params;

  try {
    const server = await Server.findOne({
      _id: serverId,
      members: req.userId,
    })
      .populate("channels")
      .populate("members", "username");

    const user = await User.findById(req.userId).select("-password");

    if (!server)
      return res.status(404).json({
        success: false,
        message: "Server not found or you're not a member",
      });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({
      success: true,
      message: "Server found",
      server,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default loadServerController;
