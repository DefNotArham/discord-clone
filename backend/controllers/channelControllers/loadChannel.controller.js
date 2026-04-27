import Server from "../../model/server.model.js";
import Channel from "../../model/channel.model.js";

const loadChannelController = async (req, res) => {
  const { serverId } = req.params;
  const { channelId } = req.params;

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

    res.status(200).json({
      success: true,
      message: "Channel loaded",
      channel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default loadChannelController;
