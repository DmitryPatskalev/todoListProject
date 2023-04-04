import { todolistsActions } from "features/todolistLists/todolists-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { TaskType } from "api/api-types";
import {
  addTask,
  fetchTasks,
  removeTask,
  updateTask,
} from "./todolists/tasks/tasks-actions";
import {
  addTodoList,
  fetchTodoLists,
  removeTodolist,
} from "./todolists/todolist-actions";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const initialTasksState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodoList.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.id] = [];
      }
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        delete state[action.payload];
      }
    });
    builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
      if (action.payload) {
        action.payload.forEach((tl) => (state[tl.id] = []));
      }
    });
    builder.addCase(todolistsActions.clearTodosDataAC, ({}) => {
      return {};
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.todoListId] = action.payload.tasks;
      }
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todoListId];
        const index = tasks.findIndex((t) => t.id === action.payload?.taskId);
        if (index !== -1) {
          tasks.splice(index, 1);
        }
      }
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todoListId];
        tasks.unshift(action.payload);
      }
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
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
