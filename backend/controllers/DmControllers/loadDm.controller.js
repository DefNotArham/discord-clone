import DM from "../../model/dm.model.js";

const loadDmController = async (req, res) => {
  const userId = req.userId;
  const { friendId } = req.params;
  try {
    if (!userId || friendId)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const messages = await DM.find({
      $or: [
        { from: userId, to: friendId },
        { from: friendId, to: userId },
      ],
    })
      .populate("to")
      .populate("from")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default loadDmController;
