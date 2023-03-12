import { AppThunk } from "../../app/store";
import { setAppStatusAC } from "../../app/app-reducer";
import { authAPI, LoginParamsType } from "../../api/todolist-api";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "../../utils/error-utils";
import { clearTodosDataAC } from "../../state/todolist_reducer/todolists-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authInitialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setIsLoggedInAC(true));
      } else handleServiceAppError(res.data, dispatch);
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  };

export const logOutTC = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setAppStatusAC("loading"));
    const res = await authAPI.logOut();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(false));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(clearTodosDataAC());
    } else handleServiceAppError(res.data, dispatch);
  } catch (error: any) {
    handleNetworkServerError(error, dispatch);
  }
};

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>;
