import { authAPI } from "../api/todolist-api";

import {
  handleNetworkServerError,
  handleServiceAppError,
} from "../utils/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setIsLoggedInAC } from "../features/login/auth-reducer";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialAppStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export const initialAppState: InitialAppStateType = {
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
        dispatch(setIsLoggedInAC(true));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
      return;
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);

const slice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload;
    },
    setAppErrorAC(state, action: PayloadAction<string | null>) {
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
export const { setAppStatusAC, setAppErrorAC } = slice.actions;

export type AppReducerActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>;
