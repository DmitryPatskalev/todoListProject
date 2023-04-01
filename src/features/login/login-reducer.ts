import { appActions } from "app/app-reducer";
import { authAPI } from "api/todolist-api";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "utils/errors/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "features/todolistLists/todolists-reducer";
import { LoginParamsType } from "api/api-types";

export const loginTC = createAsyncThunk(
  "name/login",
  async (data: LoginParamsType, { dispatch }) => {
    dispatch(appActions.setAppStatusAC("loading"));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatusAC("succeeded"));
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
    dispatch(appActions.setAppStatusAC("loading"));
    try {
      const res = await authAPI.logOut();
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatusAC("succeeded"));
        dispatch(todolistsActions.clearTodosDataAC());
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

export const loginReducer = slice.reducer;
export const authActions = slice.actions;
