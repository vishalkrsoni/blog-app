const { Router } = require("express");
const { isAuth } = require("../middlewares/authMiddleWare");

const blogRouter = Router();
const {
  addBlogByUserId,
  fetchAllBlogs,
  getBlogByID,
  updateBlogById,
  deleteBlogByID,
} = require("../controllers/blogController");

blogRouter.post("/add-blog", isAuth,addBlogByUserId);
blogRouter.get("/get-all-blogs", fetchAllBlogs);
blogRouter.get("/get-blog-by-id/:blogId", getBlogByID);
blogRouter.put("/update-blog-by-id/:blogId", updateBlogById);
blogRouter.delete("/delete-blog-by-id/:blogId", deleteBlogByID);

module.exports = blogRouter;
