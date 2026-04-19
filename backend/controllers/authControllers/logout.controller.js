const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Logged out failed",
    });
  }
};

export default logoutController;
