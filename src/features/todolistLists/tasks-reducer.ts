import {
  addTodoListTC,
  fetchTodoListsTC,
  removeTodolistTC,
  todolistsActions,
} from "features/todolistLists/todolists-reducer";
import { tasksAPI } from "api/todolist-api";
import { AppRootStateType } from "app/store";
import { appActions } from "app/app-reducer";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "utils/errors/error-utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskType, UpdateDomainTaskModelType } from "api/api-types";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const initialTasksState: TasksStateType = {};

export const fetchTasksTC = createAsyncThunk(
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

export const removeTaskTC = createAsyncThunk(
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
export const addTaskTC = createAsyncThunk(
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

export const updateTaskTC = createAsyncThunk(
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

const slice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.id] = [];
      }
    });
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      if (action.payload) {
        delete state[action.payload];
      }
    });
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      if (action.payload) {
        action.payload.forEach((tl) => (state[tl.id] = []));
      }
    });
    builder.addCase(todolistsActions.clearTodosDataAC, ({}) => {
      return {};
    });
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.todoListId] = action.payload.tasks;
      }
    });
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todoListId];
        const index = tasks.findIndex((t) => t.id === action.payload?.taskId);
        if (index !== -1) {
          tasks.splice(index, 1);
        }
      }
    });
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todoListId];
        tasks.unshift(action.payload);
      }
    });
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todoListId];
        const index = tasks.findIndex((t) => t.id === action.payload?.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      }
    });
  },
});

export const tasksReducer = slice.reducer;
