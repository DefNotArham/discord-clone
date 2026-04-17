import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { resetPasswordSucessEmail } from "../mail/mailjet.js";

const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid token or expired token",
      });

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword)
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as your current password",
      });

    // Password errors
    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
        typeError: "password",
      });

    if (!/\d/.test(password))
      return res.status(400).json({
        success: false,
        messsage: "Password must include atleast one number",
        typeError: "password",
      });

    if (!/[a-zA-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one letter",
        typeError: "password",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must include at least one uppercase letter",
        typeError: "password",
      });
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must include a special character (!@#$%^&*)",
        typeError: "password",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();
    await resetPasswordSucessEmail(user.email);

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

export default resetPasswordController;
