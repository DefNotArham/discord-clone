import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const loginController = async (req, res) => {
  let { email, password } = req.body;
  try {
    email = email?.trim().toLowerCase();

    if (!email && !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        typeError: "general",
      });

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Email is required",
        typeError: "email",
      });

    if (!password)
      return res.status(400).json({
        success: false,
        message: "Password is required",
        typeError: "password",
      });
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        typeError: "general",
      });

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        typeError: "general",
      });

    if (!existingUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
        typeError: "general",
      });
    }

    generateTokenAndSetCookie(res, existingUser._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...existingUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      typeError: "general",
    });
  }
};

export default loginController;
