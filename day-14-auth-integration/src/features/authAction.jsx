import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axiosInstance";

export let loginAction = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      let res = await axiosInstance.post("auth/login", credentials);
      //   localStorage.setItem("accessToken", res.data.accessToken);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue("login failed");
    }
  }
);