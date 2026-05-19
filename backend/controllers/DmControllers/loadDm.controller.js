import DM from "../../model/dm.model.js";

const loadDmController = async (req, res) => {
  try {
    const userId = req.userId;
    const { friendId } = req.params;

    const messages = await DM.find({
      $or: [
        { from: userId, to: friendId },
        { from: friendId, to: userId },
      ],
    })
      .populate("from", "username displayName")
      .populate("to", "username displayName")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default loadDmController;
