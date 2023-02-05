const { Router } = require("express");
const userRouter = Router();
const { isAuth } = require("../middlewares/authMiddleWare");
const {
  createUser,
  userSignIn,
  signOut,
  getAllUsers,
} = require("../controllers/userController");

const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require("../middlewares/userValidation");

userRouter.post("/sign-up", validateUserSignUp, userValidation, createUser);
userRouter.post("/sign-in", validateUserSignIn, userValidation, userSignIn);
userRouter.post("/sign-out", isAuth, signOut);
userRouter.get("/get-all-users", getAllUsers);

module.exports = userRouter;
