import Messaage from "../../model/message.model.js";

const getMessagesController = async (req, res) => {
  const { channelId } = req.params;
  try {
    if (!channelId)
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });

    const messages = await Messaage.find({ channelId })
      .populate("sender")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default getMessagesController;
