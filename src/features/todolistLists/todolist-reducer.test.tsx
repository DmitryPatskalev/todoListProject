import { v1 } from "uuid";
import {
  addTodoListTC,
  changeTodoListTitleTC,
  fetchTodoListsTC,
  removeTodolistTC,
  TodoListDomainType,
  todolistsActions,
  todolistsReducer,
} from "features/todolistLists/todolists-reducer";
import { RequestStatusType } from "app/app-reducer";
import { TodoListType } from "api/api-types";

const todoListId1 = v1();
const todoListId2 = v1();
let startState: Array<TodoListDomainType>;

beforeEach(() => {
  startState = [
    {
      id: todoListId1,
      title: "What I learn",
      filter: "All",
      order: 0,
      addedDate: "",
      entityStatus: "idle",
    },
    {
      id: todoListId2,
      title: "What You learn",
      filter: "All",
      order: 0,
      addedDate: "",
      entityStatus: "idle",
    },
  ];
});

test("todolist should be added", () => {
  const newTitle = "new todolist";
  const todoList: TodoListType = {
    id: v1(),
    title: newTitle,
    addedDate: "",
    order: 0,
  };
  const endState = todolistsReducer(
    startState,
    addTodoListTC.fulfilled(todoList, "name/addTodoList", todoList.title)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTitle);
  expect(endState[0].filter).toBe("All");
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(
    startState,
    removeTodolistTC.fulfilled(todoListId1, "name/removeTodolist", todoListId1)
  );

  expect(endState.length).toBe(1);
  expect(endState[0].title).toBe("What You learn");
  expect(endState[0].id).toEqual(todoListId2);
});

test("filter in correct todolist should be changed", () => {
  const newFilter = "Completed";
  const endState = todolistsReducer(
    startState,
    todolistsActions.changeTodoListFilterAC({
      todoListId: todoListId1,
      filter: newFilter,
    })
  );

  expect(endState[0].filter).toBe(newFilter);
  expect(endState[0].title).toBe("What I learn");
  expect(endState[1].filter).toBe("All");
});

test("todolist title should be changed", () => {
  const newTitle = "AweSome";
  const payload = {
    todoListId: todoListId2,
    title: newTitle,
  };
  const endState = todolistsReducer(
    startState,
    changeTodoListTitleTC.fulfilled(
      payload,
      "name/changeTodoListTitle",
      payload
    )
  );

  expect(endState[1].title).toBe(newTitle);
  expect(endState[1].filter).toBe("All");
});

test("todolist should be set to state", () => {
  const action = fetchTodoListsTC.fulfilled(startState, "name/fetchTodoLists");
  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});

test("correct entity status in correct todolistId should be changed", () => {
  const newStatus: RequestStatusType = "loading";

  const action = todolistsActions.changeTodolistEntityStatusAC({
    todoListId: todoListId1,
    entityStatus: newStatus,
  });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe(newStatus);
  expect(endState[1].entityStatus).toBe("idle");
});
