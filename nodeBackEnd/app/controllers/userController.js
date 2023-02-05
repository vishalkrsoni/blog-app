const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  const user = await User({
    fullname,
    email,
    password,
  });
  await user.save();
  res.json({
    success: true,
    user,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      status: "success",
      users,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      msg: "error fetching the users",
    });
  }
};

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.json({
      success: false,
      message: "user not found, with the given email!",
    });
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "email / password does not match!",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((t) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
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
    success: true,
    user: userInfo,
    token,
  });
};

const signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization fail!",
      });
    }

    const tokens = req.user.tokens;
    const newTokens = tokens.filter((t) => t.token !== token);
    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({
      success: true,
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
      success: false,
      message: "unauthorized access!",
    });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { profilePic: imageUrl },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Your profile has updated!",
      updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: error,
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
