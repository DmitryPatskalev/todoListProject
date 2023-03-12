import { combineReducers } from "redux";
import {
  TodoListActionsType,
  todolistsReducer,
} from "../state/todolist_reducer/todolists-reducer";
import {
  TasksActionType,
  tasksReducer,
} from "../state/task_reducer/tasks-reducer";
import thunk, { ThunkAction } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer, AppReducerActionsType } from "./app-reducer";
import { AuthActionsType, authReducer } from "../features/login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type AppActionsType =
  | TodoListActionsType
  | TasksActionType
  | AppReducerActionsType
  | AuthActionsType;

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

// @ts-ignore
window.store = store;
