import { axiosInstance } from "services/helper";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
  const res = await axiosInstance.get("/categories");
  return res.data;
});

const initialState = {
  category: null,
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchCategory.fulfilled,(state,{payload})=>{
      state.loading = false;
      state.category=payload.data
      
    })
  },
});

export default categorySlice.reducer;
