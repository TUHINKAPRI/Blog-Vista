import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "services/helper";

export const createPost = createAsyncThunk("createPost", async (data) => {
  const res = await axiosInstance.post("/posts", data);
  return res.data;
});
export const fetchUserPost = createAsyncThunk("fetchUserPost", async (id) => {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
});

export const fetchAllpost = createAsyncThunk("fetchAllPost", async () => {
  const res = await axiosInstance.get("/posts");
  return res.data;
});

export const deletePost = createAsyncThunk("deletePost", async (data) => {
  const res = await axiosInstance.delete(`/posts/${data.postId}`);
  return res.data;
});

export const fetchSinglePost = createAsyncThunk(
  "fetchSinglePost",
  async (postId) => {
    const res = await axiosInstance.get(`/posts/?postId=${postId}`);
    return res.data;
  }
);

export const updatePost = createAsyncThunk("updatePost", async (data) => {
  const res = await axiosInstance.put(`/posts/${data.postId}`, data.formData);
  return res.data;
});

const initialState = {
  post: [],
  singlePost: "",
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        if (payload?.status === "success") {
          toast.success(payload.message);
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchUserPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status === "success") {
          state.post = payload.data;
        }
      })
      .addCase(fetchAllpost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllpost.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status === "success") {
          state.post = payload.data;
        }
      })
      .addCase(fetchAllpost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSinglePost.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.singlePost = payload.data[0];
      })
      .addCase(fetchSinglePost.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        if (payload?.status === "success") {
          toast.success(payload?.message);
        }
      })
      .addCase(updatePost.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default postSlice.reducer;
