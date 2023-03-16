import { tasksReducer, TasksStateType } from "../task_reducer/tasks-reducer";
import {
  addTodoListTC,
  TodoListDomainType,
  todolistsReducer,
} from "./todolists-reducer";

import { TodoListType } from "../../api/todolist-api";

test("it should be equals", () => {
  const startTaskState: TasksStateType = {};
  const startTodolistState: TodoListDomainType[] = [];

  const todoList: TodoListType = {
    id: "new todolist",
    title: "new todolist",
    addedDate: "",
    order: 0,
  };

  const action = addTodoListTC.fulfilled(todoList, "title", todoList.title);

  const endTaskState = tasksReducer(startTaskState, action);
  const endTodolistState = todolistsReducer(startTodolistState, action);

  const keys = Object.keys(endTaskState);
  const idFromTask = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  if (action.payload) {
    expect(idFromTask).toBe(action.payload.id);
    expect(idFromTodolist).toBe(action.payload.id);
  }
});
