import { appActions } from "app/app-reducer";
import { authAPI } from "api/todolist-api";
import { handleNetworkServerError } from "utils/errors/handleNetworkServerError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "features/todolistLists/todolists-reducer";
import { LoginParamsType } from "api/api-types";
import { handleServiceAppError } from "../../utils/errors/handleServiceAppError";

export const loginTC = createAsyncThunk(
  "name/login",
  async (data: LoginParamsType, { dispatch }) => {
    dispatch(appActions.setAppStatus("loading"));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus("succeeded"));
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
    dispatch(appActions.setAppStatus("loading"));
    try {
      const res = await authAPI.logOut();
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus("succeeded"));
        dispatch(todolistsActions.clearTodosData());
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
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
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
