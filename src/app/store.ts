import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListActionsType, todolistsReducer} from "../state/todolist_reducer/todolists-reducer";
import {TasksActionType, tasksReducer} from "../state/task_reducer/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const rootReducer = combineReducers({
	 todoLists: todolistsReducer,
	 tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppActionsType = TodoListActionsType | TasksActionType
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector



// @ts-ignore
window.store = store