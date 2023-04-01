import { AppRootStateType } from "app/store";

export const selectTodolist = (state: AppRootStateType) => state.todoLists;

export const selectTasks = (state: AppRootStateType) => state.tasks;
