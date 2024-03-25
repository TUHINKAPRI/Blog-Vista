import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "services/helper";

export const addLikeToAComments = createAsyncThunk(
  "addLikeToAComments",
  async (commentId) => {
    const res = await axiosInstance.post(`/like/comment/${commentId}`);
    return res.data;
  }
);
