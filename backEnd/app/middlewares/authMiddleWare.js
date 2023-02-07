const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "No such user found!",
          error,
        });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized access",
          error,
        });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "error",
          message: "sesson expired try sign in!",
          error,
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Internal server error!",
        error,
      });
    }
  } else {
    res.status(401).json({
      status: "error",
      message: "unauthorized access!",
    });
  }
};

module.exports = {
  isAuth,
};
