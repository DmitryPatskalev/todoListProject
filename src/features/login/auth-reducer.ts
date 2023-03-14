import { setAppStatusAC } from "../../app/app-reducer";
import { authAPI, LoginParamsType } from "../../api/todolist-api";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "../../utils/error-utils";
import { clearTodosDataAC } from "../../state/todolist_reducer/todolists-reducer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginTC = createAsyncThunk(
  "name/login",
  async (data: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC("loading"));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC("succeeded"));
        return { isLoggedIn: true };
      } else handleServiceAppError(res.data, thunkAPI.dispatch);
    } catch (error: any) {
      handleNetworkServerError(error, thunkAPI.dispatch);
    }
  }
);

export const logOutTC = createAsyncThunk(
  "name/logout",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC("loading"));
    try {
      const res = await authAPI.logOut();
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC("succeeded"));
        thunkAPI.dispatch(clearTodosDataAC());
        return { isLoggedIn: false };
      } else handleServiceAppError(res.data, thunkAPI.dispatch);
    } catch (error: any) {
      handleNetworkServerError(error, thunkAPI.dispatch);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoggedIn = action.payload.isLoggedIn;
      }
    });
    builder.addCase(logOutTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoggedIn = action.payload.isLoggedIn;
      }
    });
  },
});

export const authReducer = slice.reducer;
