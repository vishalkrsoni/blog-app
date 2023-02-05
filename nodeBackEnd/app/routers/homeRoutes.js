const { Router } = require("express");
const homeRouter = Router();
const {
  fetchPublicBlogs,
  fetchPrivateBlogs,
  fetchUsersInfo,
} = require("../controllers/homeController");

homeRouter.get("/fetch-public-blogs", fetchPublicBlogs);
homeRouter.get("/fetch-private-blogs", fetchPrivateBlogs);
homeRouter.get("/fetch-all-users-info", fetchUsersInfo);

module.exports = homeRouter;
