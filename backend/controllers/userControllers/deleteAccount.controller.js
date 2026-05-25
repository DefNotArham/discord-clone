import User from "../../model/user.model.js";
import bcrypt from "bcryptjs";

const deleteAccountController = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.userId);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    if (!password)
      return res.status(400).json({
        success: false,
        message: "Please enter your password",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });

    await User.findByIdAndDelete(req.userId);
    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default deleteAccountController;
