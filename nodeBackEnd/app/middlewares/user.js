const User = require("../models/user");

function validateUserByID(req, res, next) {
  console.log("check id", req.token);

  const id = (req.token && req.token.id) || req.body.id;

  console.log("check id", id);

  User.findById(id)
    .then((data) => {
      if (data == null) {
        return res.status(200).json({
          response_code: 400,
          message: "Account not found",
        });
      } else {
        req.temp_user = data;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).json({
        response_code: 500,
        message:
          "Sorry something unexpected happened at our server, please try after sometime",
      });
    });
}
module.exports = {
  validateUserByID,
};
