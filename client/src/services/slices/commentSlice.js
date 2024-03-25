import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "services/helper";
import { addLikeToAComments } from "./likeSlice";

export const createComments = createAsyncThunk(
  "createComments",
  async (data) => {
    const res = await axiosInstance.post(`/comments/${data.postId}/`, {
      content: data.content,
    });
    return res.data;
  }
);

export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (postId) => {
    const res = await axiosInstance.get(`/comments/${postId}`);
    return res.data;
  }
);

export const editAComment = createAsyncThunk("editAComment", async (data) => {
  const res = await axiosInstance.put(
    `/comments/edit-comment/${data.id}`,
    data.body
  );
  return res.data;
});

export const deleteComment = createAsyncThunk("deleetComment", async (id) => {
  const res = await axiosInstance.delete(`comments/delete-comment/${id}`);
  return res.data;
});

const initialState = {
  loading: false,
  comments: [],
  deleteLoading: false,
  editLoading: false,
  addLikeLoading: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addLike: (state, { payload }) => {
      console.log(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComments.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.comments = [payload.data, ...state.comments];
      })
      .addCase(createComments.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.comments = payload.data;
      })
      .addCase(getAllComments.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(addLikeToAComments.pending, (state, { payload }) => {
        state.addLikeLoading = true;
      })
      .addCase(addLikeToAComments.fulfilled, (state, { payload }) => {
        state.addLikeLoading = false;
        const findIndex = state.comments.findIndex((ele) => {
          return ele._id === payload.data._id;
        });
        if (findIndex > -1) {
          state.comments[findIndex] = payload.data;
        }
      })
      .addCase(addLikeToAComments.rejected, (state) => {
        state.addLikeLoading = false;
      })
      .addCase(editAComment.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editAComment.fulfilled, (state, { payload }) => {
        state.editLoading = false;
        const findIndex = state.comments.findIndex(
          (ele) => ele._id === payload.data._id
        );
        state.comments[findIndex] = payload.data;
      })
      .addCase(editAComment.rejected, (state) => {
        state.editLoading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
        const findIndex = state.comments.findIndex(
          (ele) => ele._id === payload.data._id
        );
        if (findIndex > -1) {
          console.log(state.comments);
          const filterArray = state.comments.filter(
            (ele) => ele._id !== payload.data._id
          );
          state.comments = filterArray;
        }
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export default commentsSlice.reducer;
export const { addLike } = commentsSlice.actions;
