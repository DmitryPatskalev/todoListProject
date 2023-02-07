import React from "react";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialAppStateType = {
    status: RequestStatusType
    error: string | null
}

export const initialAppState: InitialAppStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: AppReducerActionsType): InitialAppStateType => {
    switch (action.type) {
        case "APP/SET_STATUS":
            return {...state, status: action.status}
        case "APP/SET_ERROR":
            return {...state, error: action.error}

        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)

export type AppReducerActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>