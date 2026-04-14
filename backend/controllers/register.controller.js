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
        typeError: "general",
      });

    // Username errors
    if (username.includes(" "))
      return res.status(400).json({
        success: false,
        message: "Username cannot contain spaces",
        typeError: "username",
      });

    if (username.length < 3 || username.length > 20)
      return res.status(400).json({
        success: false,
        message: "Username must be 3–20 characters long",
        typeError: "username",
      });

    // Email errors
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        typeError: "email",
      });
    }

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

    // DOB errors
    const birthDate = new Date(DOB);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (birthDate.getFullYear() > today.getFullYear())
      return res.status(400).json({
        sucess: false,
        message: "Invalid date of birth",
        typeError: "dob",
      });

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 13)
      return res.status(400).json({
        success: false,
        message: "You must be 13 or older to register",
        typeError: "dob",
      });

    // User errors
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        success: false,
        message: "User already exists",
        typeError: "general",
      });

    const existUsername = await User.findOne({ username });
    if (existUsername)
      return res.status(400).json({
        success: false,
        message:
          "Username is unavailable. Try adding numbers, letters, underscores _ , or periods.",
        typeError: "username",
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
      typeError: "general",
    });
  }
};

export default registerController;
