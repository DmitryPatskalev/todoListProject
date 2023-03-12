import { AppThunk } from "./store";
import { authAPI } from "../api/todolist-api";
import { setIsLoggedInAC } from "../features/login/auth-reducer";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setAppIsInitializedAC(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppStatusAC, setAppErrorAC, setAppIsInitializedAC } =
  slice.actions;

export const initializeAppTC = (): AppThunk => async (dispatch) => {
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    } else {
      handleServiceAppError(res.data, dispatch);
    }
    dispatch(setAppIsInitializedAC(true));
  } catch (error: any) {
    handleNetworkServerError(error, dispatch);
  }
};

export type AppReducerActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppIsInitializedAC>;
