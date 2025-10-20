import jwt from "jsonwebtoken";

// 1. Token Generator
export const generateToken = (userName) => {
  return jwt.sign({ userName }, process.env.JWT_SECRET, {
    expiresIn: "1h", // token expiry
    algorithm: "HS256", // hashing algorithm
  });
};

// 2. Token Verifier (Middleware)
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userName, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
