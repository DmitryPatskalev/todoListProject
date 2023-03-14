import { authAPI } from "../api/todolist-api";

import {
  handleNetworkServerError,
  handleServiceAppError,
} from "../utils/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  async (arg, thunkAPI) => {
    try {
      const res = await authAPI.me();
      if (res.data.resultCode === 0) {
        return { isLoggedIn: true };
      } else {
        handleServiceAppError(res.data, thunkAPI.dispatch);
      }
      return { isInitialized: true };
      //thunkAPI.dispatch(setAppIsInitializedAC(true));
    } catch (error: any) {
      handleNetworkServerError(error, thunkAPI.dispatch);
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
    // setAppIsInitializedAC(state, action: PayloadAction<boolean>) {
    //   state.isInitialized = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(isInitializeAppTC.fulfilled, (state, action) => {
      if (action.payload) state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;
export const { setAppStatusAC, setAppErrorAC } = slice.actions;

export type AppReducerActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>;
