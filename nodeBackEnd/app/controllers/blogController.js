const Blog = require("../models/blog");
const User = require("../models/user");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send({
      status: "success",
      blogs,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      msg: "error fetching movies",
    });
  }
};

const getBlogByID = async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId);
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).send({
        status: "error",
        msg: "blog not found",
      });
    } else {
      res.send({
        status: "success",
        blog: blog,
      });
    }
  } catch (err) {
    console.log("Error fetching blogs from DB");
    res.status(500).send({
      status: "error",
      msg: "Error fetching blogs from DB",
    });
  }
};

const addBlogByUserId = async (req, res) => {
  const { createdBy } = req.params;
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
    console.log(newBlog);
    res.status(201).send({
      status: "success",
      blog: newBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      msg: err.errors,
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
      status: "Updated Successfully",
      blog: updatedBlog,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      msg: "Cannot Update blog",
    });
  }
};

const deleteBlogByID = async (req, res) => {
  const { blogId } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    res.send({
      status: "Deleted Successfully",
      blog: deletedBlog,
    });
  } catch (err) {
    res.status(500).send({
      status: "Cannot delete movie due to internal error",
    });
  }
};

module.exports = {
  getBlogs,
  getBlogByID,
  addBlogByUserId,
  updateBlogById,
  deleteBlogByID,
};
