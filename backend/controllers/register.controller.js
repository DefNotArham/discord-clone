import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const registerController = async (req, res) => {
  let { email, username, password, DOB } = req.body;
  try {
    email = email?.trim().toLowerCase();
    username = username?.trim();

    if (!email || !username || !password || !DOB)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    if (username.includes(" "))
      return res.status(400).json({
        success: false,
        error: "Username cannot contain spaces",
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    const existUsername = await User.findOne({ username });
    if (existUsername)
      return res.status(400).json({
        success: false,
        message:
          "Username is unavailable. Try adding numbers, letters, underscores _ , or periods.",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashPassword,
      DOB,
    });

    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        ...newUser._doc,
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

export default registerController;
