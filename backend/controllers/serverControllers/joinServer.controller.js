import User from "../../model/user.model.js";
import Server from "../../model/server.model.js";

const joinServerController = async (req, res) => {
  const { inviteCode } = req.body;
  try {
    if (!inviteCode)
      return res.status(400).json({
        success: false,
        message: "Invite code is required",
        typeError: "serverJoin",
      });

    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const server = await Server.findOne({
      inviteCode,
    });

    if (!server)
      return res.status(400).json({
        success: false,
        message: "Server not found",
        typeError: "serverJoin",
      });

    const alreadyMember = server.members.includes(req.userId);

    if (alreadyMember)
      return res.status(400).json({
        success: false,
        message: "You are already in this server",
        typeError: "serverJoin",
      });

    server.members.push(req.userId);
    await server.save();

    user.servers.push(server._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Joined server successfully",
      server,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default joinServerController;
