const { Router } = require("express");
const blogRouter = Router();
const {
  addBlogByUserId,
  getBlogs,
  getBlogByID,
  updateBlogById,
  deleteBlogByID,
} = require("../controllers/blogController");

blogRouter.post("/add-blog/:createdBy", addBlogByUserId);
blogRouter.get("/get-all-blogs", getBlogs);
blogRouter.get("/get-blog-by-id/:blogId", getBlogByID);
blogRouter.put("/update-blog-by-id/:blogId", updateBlogById);
blogRouter.delete("/delete-blog-by-id/:blogId", deleteBlogByID);

module.exports = blogRouter;
