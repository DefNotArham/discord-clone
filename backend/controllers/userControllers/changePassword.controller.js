import User from "../../model/user.model.js";
import bcrypt from "bcrypt";

const changePasswordController = async (req, res) => {
  const { currentPassword } = req.body;
  const { newPassword } = req.body;
  const { confirmNewPassword } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    if (!currentPassword || !newPassword || !confirmNewPassword)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    if (newPassword !== confirmNewPassword)
      return res.status(400).json({
        success: false,
        message: "New password and confirmation do not match",
      });

    const isSame = await bcrypt.compare(newPassword, user.password);

    if (isSame)
      return res.status(400).json({
        success: false,
        message:
          "Your new password cannot be the same as your current password.",
      });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });

    // Password errors
    if (newPassword.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
        typeError: "password",
      });

    if (!/\d/.test(newPassword))
      return res.status(400).json({
        success: false,
        messsage: "Password must include atleast one number",
        typeError: "password",
      });

    if (!/[a-zA-Z]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one letter",
        typeError: "password",
      });
    }

    if (!/[A-Z]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one uppercase letter",
        typeError: "password",
      });
    }

    if (!/[!@#$%^&*]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must include a special character (!@#$%^&*)",
        typeError: "password",
      });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashNewPassword;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default changePasswordController;
