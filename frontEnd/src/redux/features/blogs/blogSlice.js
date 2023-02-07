import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import blogService from "../../../services/blogService";

const initialState = {
  blog: null,
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",

};

// Create new blog
export const createblog = createAsyncThunk(
  "blogs/create",
  async (formData, thunkAPI) => {
    try {
      return await blogService.createblog(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all blogs
export const getblogs = createAsyncThunk(
  "blogs/getAll",
  async (_, thunkAPI) => {
    try {
      return await blogService.getblogs();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a blog
export const deleteblog = createAsyncThunk(
  "blogs/delete",
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteblog(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a blog
export const getblog = createAsyncThunk(
  "blogs/getblog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getblog(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update blog
export const updateblog = createAsyncThunk(
  "blogs/updateblog",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await blogService.updateblog(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const blogs = action.payload;
      const array = [];
      blogs.map((item) => {
        const { price, quantity } = item;
        const blogValue = price * quantity;
        return array.push(blogValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const blogs = action.payload;
      const array = [];
      blogs.map((item) => {
        const { quantity } = item;

        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_content(state, action) {
      const blogs = action.payload;
      const array = [];
      blogs.map((item) => {
        const { content } = item;

        return array.push(content);
      });
      const uniquecontent = [...new Set(array)];
      state.content = uniquecontent;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.blogs = [...state.blogs, action.payload];
        toast.success("blog added successfully");
      })
      .addCase(createblog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getblogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload);
        state.blogs = action.payload;
      })
      .addCase(getblogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("blog deleted successfully");
      })
      .addCase(deleteblog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blog = action.payload;
      })
      .addCase(getblog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("blog updated successfully");
      })
      .addCase(updateblog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_content } =
  blogSlice.actions;

export const selectblog = (state) => state.blog.blog;

export const selectIsLoading = (state) => state.blog.isLoading;
export const selectTotalStoreValue = (state) => state.blog.totalStoreValue;
export const selectOutOfStock = (state) => state.blog.outOfStock;
export const selectcontent = (state) => state.blog.content;

export default blogSlice.reducer;
