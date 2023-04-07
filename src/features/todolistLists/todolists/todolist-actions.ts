import { createAsyncThunk } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { todoListAPI } from "api/todolist-api";
import { handleNetworkServerError } from "utils/errors/handleNetworkServerError";
import { fetchTasks } from "./tasks/tasks-actions";
import { todolistsActions } from "../todolists-reducer";
import { ResultCode } from "../../../api/api-types";
import { handleServiceAppError } from "../../../utils/errors/handleServiceAppError";

export const fetchTodoLists = createAsyncThunk(
  "name/fetchTodoLists",
  async (arg, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatus("loading"));
      const res = await todoListAPI.getTodoLists();
      if (res.data) {
        dispatch(appActions.setAppStatus("succeeded"));
        await res.data.forEach((tl) => {
          dispatch(fetchTasks(tl.id));
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
export const removeTodolist = createAsyncThunk(
  "name/deleteTodolist",
  async (todoListId: string, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatus("loading"));
      dispatch(
        todolistsActions.changeTodolistEntityStatus({
          todoListId,
          entityStatus: "loading",
        })
      );
      const res = await todoListAPI.deleteTodoList(todoListId);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus("succeeded"));
        return todoListId;
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);
export const addTodoList = createAsyncThunk(
  "name/addTodoList",
  async (title: string, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatus("loading"));
      const res = await todoListAPI.createTodoList(title);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus("succeeded"));
        return res.data.data.item;
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);
export const changeTodoListTitle = createAsyncThunk(
  "name/changeTodoListTitle",
  async (param: { todoListId: string; title: string }, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatus("loading"));
      const res = await todoListAPI.updateTodoList(
        param.todoListId,
        param.title
      );
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus("succeeded"));
        return { todoListId: param.todoListId, title: param.title };
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);
