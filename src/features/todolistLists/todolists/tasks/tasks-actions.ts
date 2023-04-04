import { createAsyncThunk } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { tasksAPI } from "api/todolist-api";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "utils/errors/error-utils";
import { UpdateDomainTaskModelType } from "api/api-types";
import { AppRootStateType } from "app/store";

export const fetchTasks = createAsyncThunk(
  "name/fetchTasks",
  async (todoListId: string, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatusAC("loading"));
      const res = await tasksAPI.getTasks(todoListId);
      const tasks = res.data.items;
      dispatch(appActions.setAppStatusAC("succeeded"));
      return { todoListId, tasks };
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);
export const removeTask = createAsyncThunk(
  "name/removeTask",
  async (param: { todoListId: string; taskId: string }, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatusAC("loading"));
      const res = await tasksAPI.deleteTask(param.todoListId, param.taskId);
      if (res.data) {
        dispatch(appActions.setAppStatusAC("succeeded"));
        return { todoListId: param.todoListId, taskId: param.taskId };
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);
export const addTask = createAsyncThunk(
  "name/addTask",
  async (param: { todoListId: string; title: string }, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatusAC("loading"));
      const res = await tasksAPI.createTask(param.todoListId, param.title);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatusAC("succeeded"));
        return res.data.data.item;
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      console.log(error);
      handleNetworkServerError(error, dispatch);
    }
  }
);
export const updateTask = createAsyncThunk(
  "name/updateTask",
  async (
    param: {
      todoListId: string;
      taskId: string;
      domainModel: UpdateDomainTaskModelType;
    },
    { dispatch, getState }
  ) => {
    const state = getState() as AppRootStateType;
    const task = state.tasks[param.todoListId].find(
      (t) => t.id === param.taskId
    );
    try {
      dispatch(appActions.setAppStatusAC("loading"));
      if (!task) {
        return;
      }
      const apiModel: UpdateDomainTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.domainModel,
      };

      const res = await tasksAPI.updateTask(
        param.todoListId,
        param.taskId,
        apiModel
      );
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatusAC("succeeded"));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
      return param;
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  }
);
