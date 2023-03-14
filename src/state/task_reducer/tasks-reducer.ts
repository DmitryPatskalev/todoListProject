import {
  addTodoListAC,
  clearTodosDataAC,
  removeTodoListAC,
  setTodoListAC,
} from "../todolist_reducer/todolists-reducer";
import {
  tasksAPI,
  TaskType,
  UpdateTaskModelType,
} from "../../api/todolist-api";
import { AppRootStateType, AppThunk } from "../../app/store";
import { setAppStatusAC } from "../../app/app-reducer";
import {
  handleNetworkServerError,
  handleServiceAppError,
} from "../../utils/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const initialTasksState: TasksStateType = {};

export const fetchTasksTC = createAsyncThunk(
  "name/fetchTasks",
  async (todoListId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC("loading"));
      const res = await tasksAPI.getTasks(todoListId);
      const tasks = res.data.items;
      thunkAPI.dispatch(setAppStatusAC("succeeded"));
      return { todoListId, tasks };
    } catch (error: any) {
      handleNetworkServerError(error, thunkAPI.dispatch);
    }
  }
);

export const removeTaskTC = createAsyncThunk(
  "name/removeTask",
  async (param: { todoListId: string; taskId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC("loading"));
      const res = await tasksAPI.deleteTask(param.todoListId, param.taskId);
      if (res.data) {
        thunkAPI.dispatch(setAppStatusAC("succeeded"));
        return { todoListId: param.todoListId, taskId: param.taskId };
      } else {
        handleServiceAppError(res.data, thunkAPI.dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, thunkAPI.dispatch);
    }
  }
);
export const addTaskTC =
  (todoListId: string, title: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      const res = await tasksAPI.createTask(todoListId, title);
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServiceAppError(res.data, dispatch);
        console.log(res.data);
      }
    } catch (error: any) {
      console.log(error);
      handleNetworkServerError(error, dispatch);
    }
  };

export const updateTaskTC =
  (
    todoListId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find((t) => t.id === taskId);
    try {
      dispatch(setAppStatusAC("loading"));
      if (!task) {
        return;
      }
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel,
      };
      const res = await tasksAPI.updateTask(todoListId, taskId, apiModel);
      if (res.data.resultCode === 0) {
        dispatch(updateTaskAC({ todoListId, taskId, model: domainModel }));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  };

const slice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    addTaskAC(state, action: PayloadAction<TaskType>) {
      const tasks = state[action.payload.todoListId];
      tasks.unshift(action.payload);
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        todoListId: string;
        taskId: string;
        model: UpdateDomainTaskModelType;
      }>
    ) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    clearTodosDataAC() {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodoListAC, (state, action) => {
      state[action.payload.id] = [];
    });
    builder.addCase(removeTodoListAC, (state, action) => {
      delete state[action.payload];
    });
    builder.addCase(setTodoListAC, (state, action) => {
      action.payload.forEach((tl) => (state[tl.id] = []));
    });
    builder.addCase(clearTodosDataAC, ({}) => {
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
  },
});

export const tasksReducer = slice.reducer;
export const { addTaskAC, updateTaskAC } = slice.actions;

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export type TasksActionType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof setTodoListAC>
  | ReturnType<typeof clearTodosDataAC>;
