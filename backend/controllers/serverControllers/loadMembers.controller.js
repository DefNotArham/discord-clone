import User from "../../model/user.model.js";
import Server from "../../model/server.model.js";

const loadMembersController = async (req, res) => {
  const { serverId } = req.params;
  try {
    const server = await Server.findById(serverId).populate(
      "members",
      "-password",
    );

    if (!server)
      return res
        .status(404)
        .json({ success: false, message: "Server not found" });

    const isMember = server.members.some((m) => m._id === req.userId);

    if (!isMember)
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });

    res.status(200).json({ success: true, members: server.members });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default loadMembersController;
