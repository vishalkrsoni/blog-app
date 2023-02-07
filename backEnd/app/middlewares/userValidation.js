const { check, validationResult } = require("express-validator");

const validateUserSignUp = [
  check("fullname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isString()
    .withMessage("Must be a valid name!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be within 3 to 20 character!"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please confirm Password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both password must be same!");
      }
      return true;
    }),
];

const userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    status: "error",
    message: "Please fill all details to complete sign up",
    error,
  });
};

const validateUserSignIn = [
  check("email")
  .trim()
  .isEmail()
  .withMessage("email is required!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!"),
];

module.exports = {
  userValidation,
  validateUserSignIn,
  validateUserSignUp,
};
