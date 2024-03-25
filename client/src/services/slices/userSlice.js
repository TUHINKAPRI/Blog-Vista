import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "services/helper";

export const updateUserData = createAsyncThunk(
  "updateUserData",
  async (data) => {
   
    const res = await axiosInstance.patch(
      `/user/${data.id}`,
      data.formData
    );
    return res;
  }
);

export const deleteUser = createAsyncThunk("deleteUser", async (data) => {
  const res = await axiosInstance.post(`/user/${data.userid}`,{
    password:data.password
  });
  return res.data;
});

export const fetchAllUser=createAsyncThunk('fetchAllUser',async()=>{
  const {data}=await axiosInstance.get('/user')
  return data
})

const initialState={
  users:[],
  loading:false
}

const userSlice=createSlice({
  name:'user',
  initialState,
  extraReducers:(builder)=>{
    builder
    .addCase(fetchAllUser.pending,(state,action)=>{
      state.loading=true
    })
    .addCase(fetchAllUser.fulfilled,(state,{payload})=>{
      state.loading=false;
      state.users=payload.data
    })
    .addCase(fetchAllUser.rejected,(state)=>{
      state.loading=false
    })
  }
})

export default userSlice.reducer
