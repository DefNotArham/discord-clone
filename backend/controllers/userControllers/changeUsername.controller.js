import User from "../../model/user.model.js";

const changeUsernameController = async (req, res) => {
  const { newUsername } = req.body;
  try {
    if (!newUsername)
      return res.status(400).json({
        success: false,
        message: "Please enter a username ",
      });

    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    if (newUsername.includes(" "))
      return res.status(400).json({
        success: false,
        message: "Username cannot contain spaces",
        typeError: "username",
      });

    if (newUsername.length < 3 || newUsername.length > 20)
      return res.status(400).json({
        success: false,
        message: "Username must be 3–20 characters long",
        typeError: "username",
      });

    const existUsername = await User.findOne({ username: newUsername });
    if (existUsername)
      return res.status(400).json({
        success: false,
        message:
          "Username is unavailable. Try adding numbers, letters, underscores _ , or periods.",
        typeError: "username",
      });

    user.username = newUsername;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Username changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default changeUsernameController;
