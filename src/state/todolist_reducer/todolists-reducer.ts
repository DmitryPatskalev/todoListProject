import { todoListAPI, TodoListType } from "../../api/todolist-api";
import { AppThunk } from "../../app/store";
import { RequestStatusType, setAppStatusAC } from "../../app/app-reducer";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "../../utils/error-utils";
import { fetchTasksTC } from "../task_reducer/tasks-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialTodolistState: Array<TodoListDomainType> = [];

export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type FilterValuesType = "All" | "Active" | "Completed";

const slice = createSlice({
  name: "todolist",
  initialState: initialTodolistState,
  reducers: {
    addTodoListAC(state, action: PayloadAction<TodoListType>) {
      state.unshift({
        ...action.payload,
        filter: "All",
        entityStatus: "idle",
      });
    },
    removeTodoListAC(state, action: PayloadAction<string>) {
      const index = state.findIndex((tl) => tl.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    changeTodoListFilterAC(
      state,
      action: PayloadAction<{ todoListId: string; filter: FilterValuesType }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todoListId
      );
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    },
    changeTodoListTitleAC(
      state,
      action: PayloadAction<{ todoListId: string; title: string }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todoListId
      );
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    },
    setTodoListAC(state, action: PayloadAction<Array<TodoListType>>) {
      return action.payload.map((tl) => ({
        ...tl,
        filter: "All",
        entityStatus: "idle",
      }));
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{
        todoListId: string;
        entityStatus: RequestStatusType;
      }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todoListId
      );
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus;
      }
    },
    clearTodosDataAC() {
      return [];
    },
  },
});

export const todolistsReducer = slice.reducer;
export const {
  addTodoListAC,
  removeTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  setTodoListAC,
  changeTodolistEntityStatusAC,
  clearTodosDataAC,
} = slice.actions;

// thunks
export const fetchTodoListsTC = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setAppStatusAC("loading"));
    const res = await todoListAPI.getTodoLists();
    if (res.data) {
      dispatch(setTodoListAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
      const todos = res.data;
      await todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id));
      });
    } else {
      handleServiceAppError(res.data, dispatch);
    }
  } catch (error: any) {
    console.log(error);
    handleNetworkServerError(error, dispatch);
  }
};

export const deleteTodolistTC =
  (todoListId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      dispatch(
        changeTodolistEntityStatusAC({ todoListId, entityStatus: "loading" })
      );
      const res = await todoListAPI.deleteTodoList(todoListId);
      if (res.data.resultCode === 0) {
        dispatch(removeTodoListAC(todoListId));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  };

export const addTodoListTC =
  (title: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      const res = await todoListAPI.createTodoList(title);
      if (res.data.resultCode === 0) {
        console.log(res);
        dispatch(addTodoListAC(res.data.data.item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  };

export const changeTodoListTitleTC =
  (todoListId: string, title: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      const res = await todoListAPI.updateTodoList(todoListId, title);
      if (res.data.resultCode === 0) {
        dispatch(changeTodoListTitleAC({ todoListId, title }));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  };

export type TodoListActionsType =
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof changeTodoListTitleAC>
  | ReturnType<typeof setTodoListAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ReturnType<typeof clearTodosDataAC>;
