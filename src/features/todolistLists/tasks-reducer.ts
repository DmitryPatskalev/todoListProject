import { todolistsActions } from "features/todolistLists/todolists-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { TaskType } from "api/api-types";
import { tasksThunk } from "./todolists/tasks/tasks-actions";
import { todoListThunk } from "features/todolistLists/todolists/todolist-actions";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const initialTasksState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(todoListThunk.addTodoList.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.id] = [];
      }
    });
    builder.addCase(todoListThunk.removeTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        delete state[action.payload];
      }
    });
    builder.addCase(todoListThunk.fetchTodoLists.fulfilled, (state, action) => {
      if (action.payload) {
        action.payload.forEach((tl) => (state[tl.id] = []));
      }
    });
    builder.addCase(todolistsActions.clearTodosData, ({}) => {
      return {};
    });
    builder.addCase(tasksThunk.fetchTasks.fulfilled, (state, action) => {
      state[action.payload.todoListId] = action.payload.tasks;
    });
    builder.addCase(tasksThunk.removeTask.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todoListId];
        const index = tasks.findIndex((t) => t.id === action.payload?.taskId);
        if (index !== -1) {
          tasks.splice(index, 1);
        }
      }
    });
    builder.addCase(tasksThunk.addTask.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todoListId];
        tasks.unshift(action.payload);
      }
    });
    builder.addCase(tasksThunk.updateTask.fulfilled, (state, action) => {
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
