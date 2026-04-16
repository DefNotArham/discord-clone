import User from "../model/user.model.js";

const changeStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    user.status = status;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default changeStatusController;
