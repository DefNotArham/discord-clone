import Server from "../../model/server.model.js";
import User from "../../model/user.model.js";

const editServerName = async (req, res) => {
  const { serverId } = req.params;
  const { newServerName } = req.body;
  try {
    const server = await Server.findById({
      _id: serverId,
      owner: req.userId,
    });

    if (!server)
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });

    if (!newServerName)
      return res.status(400).json({
        success: false,
        message: "Enter new server name",
        typeError: "editServername",
      });

    if (newServerName === server.name)
      return res.status(400).json({
        success: false,
        message: "Server name is already the same",
        typeError: "editServername",
      });

    server.name = newServerName;
    await server.save();

    res.status(200).json({
      success: true,
      message: "Successfully changed server name",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default editServerName;
