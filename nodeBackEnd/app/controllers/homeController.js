const Blog = require("../models/blog");
const User = require("../models/user");

const fetchPublicBlogs = async (req, res) => {
  try {
    let publicBlogs = await Blog.find({ isPrivate: false });
    res.send({
      status: "success",
      publicBlogs,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      msg: "error fetching blogs",
    });
  }
};

const fetchPrivateBlogs = async (req, res) => {
  try {
    let publicBlogs = await Blog.find({ isPrivate: true });
    res.send({
      status: "success",
      publicBlogs,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      msg: "error fetching blogs",
    });
  }
};

const fetchUsersInfo = async (req, res) => {
  try {
    let usersList = await User.find().populate("myBlogs", {
      isPrivate: 1,
      _id: 0,
    });

    const finalData = usersList.map((user) => {
      return {
        name: user.fullname,
        email: user.email,
        totalBlogs: user.myBlogs.length,
        privateBlogs: user.myBlogs.filter((blog) => blog.isPrivate == true)
          .length,
        publicBlogs: user.myBlogs.filter((blog) => blog.isPrivate == true)
          .length,
      };
    });

    res.send({
      status: "success",
      usersInfo: finalData,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      msg: "error fetching details",
    });
  }
};
module.exports = {
  fetchUsersInfo,
  fetchPrivateBlogs,
  fetchPublicBlogs,
};
