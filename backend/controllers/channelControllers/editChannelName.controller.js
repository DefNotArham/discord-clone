import Server from "../../model/server.model.js";
import Channel from "../../model/channel.model.js";

const editChannelController = async (req, res) => {
  const { serverId } = req.params;
  const { channelId } = req.params;

  const { newChannelName } = req.body;
  try {
    const server = await Server.findOne({
      _id: serverId,
      owner: req.userId,
    });

    if (!server)
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });

    const channel = await Channel.findOne({
      _id: channelId,
      server: serverId,
    });

    if (!channel)
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });

    if (!newChannelName)
      return res.status(400).json({
        success: false,
        message: "Enter new server name",
      });

    if (newChannelName === channel.name)
      return res.status(400).json({
        success: false,
        message: "Channel name is already the same",
        typeError: "editChannel",
      });

    channel.name = newChannelName;
    await channel.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully changed channel name" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default editChannelController;
