import { setAppStatusAC } from "../../app/app-reducer";
import { authAPI, LoginParamsType } from "../../api/todolist-api";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "../../utils/error-utils";
import { clearTodosDataAC } from "../../state/todolist_reducer/todolists-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const loginTC = createAsyncThunk(
  "name/login",
  async (data: LoginParamsType, { dispatch }) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"));
        return;
      } else handleServiceAppError(res.data, dispatch);
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);

export const logOutTC = createAsyncThunk(
  "name/logout",
  async (arg, { dispatch }) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const res = await authAPI.logOut();
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(clearTodosDataAC());
        return;
      } else handleServiceAppError(res.data, dispatch);
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
    builder.addCase(logOutTC.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;
