import { todoListAPI } from "api/todolist-api";
import { appActions, RequestStatusType } from "app/app-reducer";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "utils/errors/error-utils";
import { fetchTasksTC } from "features/todolistLists/tasks-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoListType } from "api/api-types";

export const initialTodolistState: Array<TodoListDomainType> = [];

export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type FilterValuesType = "All" | "Active" | "Completed";

export const fetchTodoListsTC = createAsyncThunk(
  "name/fetchTodoLists",
  async (arg, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatusAC("loading"));
      const res = await todoListAPI.getTodoLists();
      if (res.data) {
        dispatch(appActions.setAppStatusAC("succeeded"));
        await res.data.forEach((tl) => {
          dispatch(fetchTasksTC(tl.id));
        });
        return res.data;
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      console.log(error);
      handleNetworkServerError(error, dispatch);
    }
  }
);

export const removeTodolistTC = createAsyncThunk(
  "name/deleteTodolist",
  async (todoListId: string, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatusAC("loading"));
      dispatch(
        todolistsActions.changeTodolistEntityStatusAC({
          todoListId,
          entityStatus: "loading",
        })
      );
      const res = await todoListAPI.deleteTodoList(todoListId);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatusAC("succeeded"));
        return todoListId;
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);

export const addTodoListTC = createAsyncThunk(
  "name/addTodoList",
  async (title: string, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatusAC("loading"));
      const res = await todoListAPI.createTodoList(title);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatusAC("succeeded"));
        return res.data.data.item;
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);

export const changeTodoListTitleTC = createAsyncThunk(
  "name/changeTodoListTitle",
  async (param: { todoListId: string; title: string }, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatusAC("loading"));
      const res = await todoListAPI.updateTodoList(
        param.todoListId,
        param.title
      );
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatusAC("succeeded"));
        return { todoListId: param.todoListId, title: param.title };
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);

const slice = createSlice({
  name: "todolist",
  initialState: initialTodolistState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload.map((tl) => ({
          ...tl,
          filter: "All",
          entityStatus: "idle",
        }));
      }
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    });
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.unshift({
          ...action.payload,
          filter: "All",
          entityStatus: "idle",
        });
      }
    });
    builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => {
        if (action.payload) {
          return tl.id === action.payload.todoListId;
        }
      });
      if (index !== -1 && action.payload) {
        state[index].title = action.payload.title;
      }
    });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
