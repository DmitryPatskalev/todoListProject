import {ResponceTodolistType} from "../api/todolist-api";
import {AppReducerActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";


type ErrorUtilsDispatchType = Dispatch<AppReducerActionsType>

export const handleServiceAppError = <T>(data: ResponceTodolistType<T>, dispatch: ErrorUtilsDispatchType) => {
	 if (data.messages.length) {
			dispatch(setAppErrorAC(data.messages[0]))
	 } else {
			dispatch(setAppErrorAC('Some error occurred'))
	 }
	 dispatch(setAppStatusAC('failed'))
}

export const handleNetworkServerError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
	 dispatch(setAppErrorAC(error.message))
	 dispatch(setAppStatusAC('failed'))
}
