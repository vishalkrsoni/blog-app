const User = require("../models/user");

function validateUserByID(req, res, next) {
  console.log("check id", req.token);

  const id = (req.token && req.token.id) || req.body.id;

  console.log("check id", id);

  User.findById(id)
    .then((data) => {
      if (data == null) {
        return res.status(400).json({
          status: "errror",
          message: "Account not found",
        });
      } else {
        req.temp_user = data;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: "errror",
        message: "Please try after sometime",
        err,
      });
    });
}
module.exports = {
  validateUserByID,
};
