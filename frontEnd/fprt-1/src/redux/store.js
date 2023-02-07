import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
// import blogReducer from "../redux/features/blogs/blogReducer";
// import userReducer from "../redux/features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // blog: blogReducer,
  },
});
