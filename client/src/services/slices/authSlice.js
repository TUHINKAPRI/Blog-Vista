import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper";
import { toast } from "react-toastify";
import { deleteUser, updateUserData } from "./userSlice";
import axios from "axios";
export const signup = createAsyncThunk("signup", async (fd) => {
  console.log('hi deara')
  try {
    const res = await axiosInstance.post("/auth/signup", fd);
    console.log(res)
    return res.data;
  } catch (err) {
    return err.response;
  }
});
export const signin = createAsyncThunk("signin", async (formData) => {
  try {
    const res = await axiosInstance.post("/auth/signin", formData);
    return res.data;
  } catch (err) {
    return err.response;
  }
});

export const signupwithGoogle = createAsyncThunk(
  "signupwithGoogle",
  async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/google", formData);
      return res.data;
    } catch (err) {
      return err.response;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    redirectTo: null,
  },
  reducers: {
    signOut: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;

      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
      toast.success("SignOut successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload === undefined) {
          toast.error("something went wromg");
        }
        if (payload?.status === "success") {
          toast.success(payload.message);
          state.error = null;
        } else {
          state.error = payload?.data?.message;
        }
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload?.status === "success") {
          state.error = null;
          state.user = payload.data;
          state.isAuthenticated = true;
          localStorage.setItem("token", JSON.stringify(payload.token));
        } else {
          state.error = payload?.data?.message;
        }
      })
      .addCase(signupwithGoogle.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signupwithGoogle.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        if (payload?.status === "success") {
          state.user = payload.data;
          state.error = null;
          state.isAuthenticated = true;
          localStorage.setItem("token", JSON.stringify(payload.token));
        }
      })
      .addCase(updateUserData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data.data;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const admin = JSON.parse(
          JSON.parse(localStorage.getItem("persist:root"))?.auth
        )?.user?.isAdmin;
        if (!admin) {
          state.user = null;
          localStorage.removeItem("token");
          localStorage.removeItem("persist:root");
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export const { signOut } = authSlice.actions;
