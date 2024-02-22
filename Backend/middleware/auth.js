const jwt = require("jsonwebtoken");
const config = require("../config/dbconfig");
const User = require("../models/users.model");

const authMiddleware = {};

authMiddleware.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(token, config.jwtSecret);
    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
