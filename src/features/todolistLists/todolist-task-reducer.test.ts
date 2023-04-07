import {
  tasksReducer,
  TasksStateType,
} from "features/todolistLists/tasks-reducer";
import {
  TodoListDomainType,
  todolistsReducer,
} from "features/todolistLists/todolists-reducer";

import { TodoListType } from "api/api-types";
import { todoListThunk } from "features/todolistLists/todolists/todolist-actions";

test("it should be equals", () => {
  const startTaskState: TasksStateType = {};
  const startTodolistState: TodoListDomainType[] = [];

  const todoList: TodoListType = {
    id: "new todolist",
    title: "new todolist",
    addedDate: "",
    order: 0,
  };

  const action = todoListThunk.addTodoList.fulfilled(
    todoList,
    "name/addTodoList",
    todoList.title
  );

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
