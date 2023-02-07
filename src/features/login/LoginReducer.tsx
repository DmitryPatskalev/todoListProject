import React from "react";
import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleNetworkServerError, handleServiceAppError} from "../../utils/error-utils";

export const authInitialState = {
    isLoggedIn: false
}
type InitialStateType = typeof authInitialState

export const loginReducer = (state: InitialStateType = authInitialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'login/SET_IS_LOGGED_IN', isLoggedIn} as const)

export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {

        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            alert('Ok')
            dispatch(setAppStatusAC('succeeded'))
        } else
            handleServiceAppError(res.data, dispatch)
    } catch (error: any) {
        handleNetworkServerError(error.message, dispatch)
    }
}