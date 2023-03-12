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
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const initialTasksState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    removeTaskAC(
      state,
      action: PayloadAction<{ todoListId: string; taskId: string }>
    ) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    },
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
    setTasksAC(
      state,
      action: PayloadAction<{ todoListId: string; tasks: Array<TaskType> }>
    ) {
      state[action.payload.todoListId] = action.payload.tasks;
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
  },
});

export const tasksReducer = slice.reducer;
export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } =
  slice.actions;

// thunks
export const fetchTasksTC =
  (todoListId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      const res = await tasksAPI.getTasks(todoListId);
      if (res.data.items) {
        dispatch(setTasksAC({ todoListId, tasks: res.data.items }));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServiceAppError(res.data.items, dispatch);
      }
    } catch (error: any) {
      handleNetworkServerError(error, dispatch);
    }
  };

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

export const removeTaskTC =
  (todoListId: string, taskId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      const res = await tasksAPI.deleteTask(todoListId, taskId);
      if (res.data) {
        dispatch(removeTaskAC({ todoListId, taskId }));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServiceAppError(res.data, dispatch);
      }
    } catch (error: any) {
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

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export type TasksActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof setTodoListAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof clearTodosDataAC>;
