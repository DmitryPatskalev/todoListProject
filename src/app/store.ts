import { combineReducers } from "redux";
import { todolistsReducer } from "features/todolistLists/todolists-reducer";
import { tasksReducer } from "features/todolistLists/tasks-reducer";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "./app-reducer";
import { loginReducer } from "features/login/login-reducer";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: loginReducer,
});

//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

// @ts-ignore
window.store = store;
