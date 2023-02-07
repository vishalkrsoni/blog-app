const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.status(409).json({
      status: "error",
      message: "This email is already in use, try sign-in",
    });
  const user = await User({
    fullname,
    email,
    password,
  });
  await user.save();
  res.status(201).json({
    status: "success",
    message: "Account Created Successfully. Login to explore",
    user,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      status: "success",
      message: "all users detail found",
      users,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "error fetching the users",
    });
  }
};

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({
      status: "error",
      message: "user not found, with the given email!",
    });
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({
      status: "error",
      message: "email / password does not match!",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((token) => {
      const timeDiff = (Date.now() - parseInt(token.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return token;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    fullname: user.fullname,
    email: user.email,
    profilePic: user.profilePic ? user.profilePic : "",
  };
  res.json({
    status: "success",
    message: "Login successful",
    user: userInfo,
    token, // <--- for testing
  });
};

const signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Authorization fail!",
      });
    }

    const tokens = req.user.tokens;
    const newTokens = tokens.filter((t) => t.token !== token);
    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({
      status: "success",
      message: "Sign out successfully!",
    });
  }
};

const uploadProfile = async (req, res) => {
  let imageUrl = await req.file.location;
  let fileName = await req.file.key;
  const { user } = req;
  if (!user)
    return res.status(401).json({
      status: "error",

      message: "unauthorized access. no such user!",
    });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { profilePic: imageUrl },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      message: "Your profile has updated!",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error,
      status: "error",
      message: "server error, try after some time",
    });
  }
};

module.exports = {
  createUser,
  userSignIn,
  signOut,
  uploadProfile,
  getAllUsers,
};
