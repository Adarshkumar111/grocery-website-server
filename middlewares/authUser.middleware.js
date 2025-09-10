import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.cookies.token; // cookie se token lo
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    req.userId = decoded.id; // use req.userId instead of mutating body
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authUser;
