import User from "../model/user.model.js";

const editDisplayNameController = async (req, res) => {
  const { newDisplayName } = req.body;
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    user.displayName = newDisplayName;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Display name updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default editDisplayNameController;
