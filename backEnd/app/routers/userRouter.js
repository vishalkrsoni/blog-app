const { Router } = require("express");
const userRouter = Router();
const { isAuth } = require("../middlewares/authMiddleWare");
const {uploadImageTos3} = require("../services/uploadToS3");
const {
  createUser,
  userSignIn,
  uploadProfile,
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

userRouter.put(
  "/upload-profile",
  isAuth,
  uploadImageTos3.single("file"),
  uploadProfile
);

module.exports = userRouter;
