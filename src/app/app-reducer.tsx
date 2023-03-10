import React from "react";
import {AppThunk} from "./store";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/login/AuthReducer";
import {handleNetworkServerError, handleServiceAppError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialAppStateType = {
	 status: RequestStatusType
	 error: string | null
	 isInitialized: boolean
}

export const initialAppState: InitialAppStateType = {
	 status: 'loading',
	 error: null,
	 isInitialized: false
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: AppReducerActionsType): InitialAppStateType => {
	 switch (action.type) {

			case "APP/SET_STATUS":
				 return {...state, status: action.status}

			case "APP/SET_ERROR":
				 return {...state, error: action.error}

			case "APP/SET_INITIALIZE":
				 return {...state, isInitialized: action.isInitialized}

			default:
				 return state
	 }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)

export const setAppIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET_INITIALIZE', isInitialized} as const)

export const initializeAppTC = (): AppThunk => async dispatch => {
	 try {
			const res = await authAPI.me()
			if (res.data.resultCode === 0) {
				 dispatch(setIsLoggedInAC(true))
			} else {
				handleServiceAppError(res.data, dispatch)
			}
			dispatch(setAppIsInitializedAC(true))
	 } catch (error: any) {
		 handleNetworkServerError(error, dispatch)
	 }
}

export type AppReducerActionsType =
	| ReturnType<typeof setAppStatusAC>
	| ReturnType<typeof setAppErrorAC>
	| ReturnType<typeof setAppIsInitializedAC>