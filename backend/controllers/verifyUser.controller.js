import User from "../model/user.model.js";

const verifyUserController = async (req, res) => {
  const { code } = req.body;
  try {
    if (!code)
      return res.status(400).json({
        success: false,
        message: "Please enter the verification code",
      });

    const user = await User.findOne({
      verificationCode: code,
      verificationCodeExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Verification code is not valid or expired",
      });

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiresAt = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Verified email successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

export default verifyUserController;
