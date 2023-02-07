const Blog = require("../models/blog");
const User = require("../models/user");

const fetchPublicBlogs = async (req, res) => {
  try {
    let publicBlogs = await Blog.find({ isPrivate: false }).populate(
      "createdBy",
      {
        fullname: 1,
        _id: 0,
        profilePic: 1,
      }
    );
    res.send({
      status: "success",
      message: "fetched all public blogs",
      blogs: publicBlogs,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "error fetching blogs",
    });
  }
};

const fetchPrivateBlogs = async (req, res) => {
  const { user } = req;
  if (!user)
    return res.status(401).json({
      status: "success",
      message: "unauthorized access!",
    });

  try {
    let blogsData = await User.find(user._id, { fullname: 1, _id: 0 }).populate(
      "myBlogs",
      {
        _id: 0,
      }
    );
    // let usersBlogs = blogsData[0].myBlogs;
    let privateBlogs = blogsData[0].myBlogs.filter(
      (blog) => blog.isPrivate === true
    );
    console.log(privateBlogs);
    res.send({
      status: "success",
      message: "fetched private blogs by user",
      blogs: privateBlogs,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "error fetching blogs",
      err,
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
        publicBlogs: user.myBlogs.filter((blog) => blog.isPrivate == false)
          .length,
      };
    });

    res.send({
      status: "success",
      message: "fetched users blog info",
      usersInfo: finalData,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "error fetching details",
    });
  }
};
module.exports = {
  fetchUsersInfo,
  fetchPrivateBlogs,
  fetchPublicBlogs,
};
