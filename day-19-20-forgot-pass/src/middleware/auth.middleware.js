const jwt = require("jsonwebtoken");
const cacheInstance = require("../config/caching");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    let isBlackListed = await cacheInstance.get(token);

    if (isBlackListed)
      return res.status(401).json({
        message: "HTMKC",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;