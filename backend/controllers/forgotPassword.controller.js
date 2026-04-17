import User from "../model/user.model.js";
import crypto from "crypto";
import { resetPasswordEmail } from "../mail/mailjet.js";

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email)
      return res.status(400).json({
        success: false,
        message: "This field is required",
      });
    const existUser = await User.findOne({ email });

    if (!existUser)
      return res.status(400).json({
        success: false,
        message: "Email does not exist",
      });

    existUser.resetPasswordToken = crypto.randomBytes(32).toString("hex");
    existUser.resetPasswordTokenExpiresAt = Date.now() + 60 * 60 * 1000;

    await existUser.save();

    await resetPasswordEmail(existUser.email, existUser.resetPasswordToken);

    res.status(200).json({
      success: true,
      message: "Reset email sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default forgotPasswordController;
