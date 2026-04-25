import Server from "../../model/server.model.js";
import User from "../../model/user.model.js";
import Channel from "../../model/channel.model.js";

const deleteChannelController = async (req, res) => {
  const { serverId, channelId } = req.params;

  try {
    if (!serverId || !channelId) {
      return res.status(400).json({
        success: false,
        message: "Missing serverId or channelId",
      });
    }

    const server = await Server.findOne({
      _id: serverId,
      owner: req.userId,
    });

    if (!server)
      return res.status(404).json({
        success: false,
        message: "Server not found",
      });

    const channel = await Channel.findById(channelId);

    if (!channel)
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    await Channel.findByIdAndDelete(channelId);

    server.channels = server.channels.filter(
      (c) => c.toString() !== channelId.toString(),
    );

    await server.save();
    res.status(200).json({
      success: true,
      message: "Deleted channel successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default deleteChannelController;
