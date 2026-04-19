import User from "../../model/user.model.js";

const checkAuthController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default checkAuthController;
