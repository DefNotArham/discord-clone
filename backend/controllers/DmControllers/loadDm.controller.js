import DM from "../../model/dm.model.js";

const loadDmController = async (req, res) => {
  const userId = req.userId;
  const { senderId } = req.body;
  try {
    if (!userId || senderId)
      return res.status(404).json({ success: false, message: "" });
  } catch (error) {}
};
