import { createAsyncThunk } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { tasksAPI } from "api/todolist-api";
import { handleNetworkServerError } from "utils/errors/handleNetworkServerError";
import { ResultCode, UpdateDomainTaskModelType } from "api/api-types";
import { AppRootStateType } from "app/store";
import { handleServiceAppError } from "utils/errors/handleServiceAppError";

const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (todoListId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appActions.setAppStatus("loading"));
      const res = await tasksAPI.getTasks(todoListId);
      const tasks = res.data.items;
      dispatch(appActions.setAppStatus("succeeded"));
      return { todoListId, tasks };
    } catch (error) {
      handleNetworkServerError(error, dispatch);
      return rejectWithValue(error);
    }
  }
);
const removeTask = createAsyncThunk(
  "name/removeTask",
  async (param: { todoListId: string; taskId: string }, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatus("loading"));
      const res = await tasksAPI.deleteTask(param.todoListId, param.taskId);
      if (res.data) {
        dispatch(appActions.setAppStatus("succeeded"));
        return { todoListId: param.todoListId, taskId: param.taskId };
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error) {
      handleNetworkServerError(error, dispatch);
    }
  }
);
const addTask = createAsyncThunk(
  "name/addTask",
  async (param: { todoListId: string; title: string }, { dispatch }) => {
    try {
      dispatch(appActions.setAppStatus("loading"));
      const res = await tasksAPI.createTask(param.todoListId, param.title);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus("succeeded"));
        return res.data.data.item;
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error) {
      handleNetworkServerError(error, dispatch);
    }
  }
);
const updateTask = createAsyncThunk(
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
      dispatch(appActions.setAppStatus("loading"));
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
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus("succeeded"));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
      return param;
    } catch (error) {
      handleNetworkServerError(error, dispatch);
    }
  }
);

export const tasksThunk = { fetchTasks, removeTask, addTask, updateTask };
