import React from "react";
import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleNetworkServerError, handleServiceAppError} from "../../utils/error-utils";
import {clearTodosDataAC} from "../../state/todolist_reducer/todolists-reducer";

export const authInitialState = {
   isLoggedIn: false
}
type InitialStateType = typeof authInitialState

export const authReducer = (state: InitialStateType = authInitialState, action: AuthActionsType): InitialStateType => {
   switch (action.type) {
      case "login/SET_IS_LOGGED_IN":
         return {...state, isLoggedIn: action.isLoggedIn}

      case "login/SET_LOG_OUT":
         return {...state, isLoggedIn: action.logOut}
      default:
         return state
   }
}

export type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setLogOutAC>

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'login/SET_IS_LOGGED_IN', isLoggedIn} as const)

export const setLogOutAC = (logOut: boolean) => ({
   type: 'login/SET_LOG_OUT', logOut
} as const)

export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
   try {
      dispatch(setAppStatusAC('loading'))
      const res = await authAPI.login(data)
      if (res.data.resultCode === 0) {
         dispatch(setAppStatusAC('succeeded'))
         dispatch(setIsLoggedInAC(true))
      } else
         handleServiceAppError(res.data, dispatch)
   } catch (error: any) {
      handleNetworkServerError(error, dispatch)
   }
}

export const logOutTC = (): AppThunk => async dispatch => {
   try {
      dispatch(setAppStatusAC('loading'))
      const res = await authAPI.logOut()
      if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC(false))
         dispatch(setAppStatusAC('succeeded'))
         dispatch(clearTodosDataAC())
      } else
         handleServiceAppError(res.data, dispatch)
   } catch (error: any) {
      handleNetworkServerError(error, dispatch)
   }
}