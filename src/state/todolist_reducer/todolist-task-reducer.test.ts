import { tasksReducer, TasksStateType } from "../task_reducer/tasks-reducer";
import {
  addTodoListAC,
  TodoListDomainType,
  todolistsReducer,
} from "./todolists-reducer";

test("it should be equals", () => {
  const startTaskState: TasksStateType = {};
  const startTodolistState: TodoListDomainType[] = [];

  const action = addTodoListAC({
    id: "new todolist",
    title: "new todolist",
    addedDate: "",
    order: 0,
  });

  const endTaskState = tasksReducer(startTaskState, action);
  const endTodolistState = todolistsReducer(startTodolistState, action);

  const keys = Object.keys(endTaskState);
  const idFromTask = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  expect(idFromTask).toBe(action.todoList.id);
  expect(idFromTodolist).toBe(action.todoList.id);
});
