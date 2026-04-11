import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const loginController = async (req, res) => {
  let { email, password } = req.body;
  try {
    email = email?.trim().toLowerCase();

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

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
    });
  }
};

export default loginController;
