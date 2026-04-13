import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized - no token",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Unauthorized - invalid or expired token",
    });
  }
};

export default verifyToken;
