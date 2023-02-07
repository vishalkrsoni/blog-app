const Blog = require("../models/blog");
const User = require("../models/user");

const fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", {
      fullname: 1,
      _id: 0,
      profilePic: 1,
    });
    res.send({
      status: "success",
      message: "successfully fetched blogs list.",
      blogs,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: err,
    });
  }
};

const getBlogByID = async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId);
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(400).send({
        status: "error",
        message: "Could not find blog, incorrect request",
        error: err,
      });
    } else {
      res.send({
        status: "success",
        message: "Successfully fetched blog detail",
        blog: blog,
      });
    }
  } catch (err) {
    console.log("Error fetching blogs from DB");
    res.status(500).send({
      status: "error",
      message: "Server error occurred",
      error: err,
    });
  }
};

const addBlogByUserId = async (req, res) => {
  // const { createdBy } = req.params;
  const { user } = req;
  const createdBy = user._id;
  const { title, description, content, isPrivate } = req.body;
  try {
    const newBlog = await Blog.create({
      title,
      description,
      content,
      isPrivate,
      createdBy,
    });

    const userDoc = await User.findByIdAndUpdate(createdBy, {
      $push: {
        myBlogs: newBlog._id,
      },
    });
    // console.log(userDoc, "updating user");

    res.status(201).send({
      status: "success",
      message: "Successfully added blog",
      blog: newBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: err.errors,
    });
  }
};

const updateBlogById = async (req, res) => {
  const { blogId } = req.params;
  const updatedblogData = req.body;
  try {
    // await Blog.updateOne({ _id: new ObjectId(blogId) }, { $set: updatedblogData })
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedblogData, {
      new: true,
      runValidators: true,
    });
    res.send({
      status: "success",
      message: "Successfully updated blog",
      blog: updatedBlog,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "Cannot Update blog",
      err,
    });
  }
};

const deleteBlogByID = async (req, res) => {
  const { blogId } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    res.send({
      status: "success",
      message: "Deleted Successfully",
      blog: deletedBlog,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "Cannot delete blog due to internal error",
      err,
    });
  }
};

module.exports = {
  fetchAllBlogs,
  getBlogByID,
  addBlogByUserId,
  updateBlogById,
  deleteBlogByID,
};
