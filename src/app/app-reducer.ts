import { authAPI } from "api/todolist-api";

import { handleNetworkServerError } from "utils/errors/handleNetworkServerError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginActions } from "features/login/login-reducer";
import { handleServiceAppError } from "utils/errors/handleServiceAppError";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type AppInitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export const initialAppState: AppInitialStateType = {
  status: "loading",
  error: null,
  isInitialized: false,
};

export const isInitializeAppTC = createAsyncThunk(
  "app/isInitializeAppTC",
  async (arg, { dispatch }) => {
    try {
      const res = await authAPI.me();
      if (res.data.resultCode === 0) {
        dispatch(loginActions.setIsLoggedIn(true));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
      return;
    } catch (error) {
      handleNetworkServerError(error, dispatch);
    }
  }
);

const slice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload;
    },
    setAppError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(isInitializeAppTC.fulfilled, (state) => {
      state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
