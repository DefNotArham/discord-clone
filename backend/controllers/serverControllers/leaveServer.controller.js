import User from "../../model/user.model.js";
import Server from "../../model/server.model.js";

const leaveServerController = async (req, res) => {
  const { serverId } = req.params;
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const server = await Server.findOne({
      _id: serverId,
      members: req.userId,
    });

    if (!server)
      return res.status(404).json({
        success: false,
        message: "Server not found",
      });

    server.members = server.members.filter((m) => m.toString() !== req.userId);
    await server.save();

    user.servers = user.servers.filter((s) => s.toString() !== serverId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully left the server",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default leaveServerController;
