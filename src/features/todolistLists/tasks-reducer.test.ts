import {
  tasksReducer,
  TasksStateType,
} from "features/todolistLists/tasks-reducer";

import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "api/api-types";
import { tasksThunk } from "./todolists/tasks/tasks-actions";
import { todoListThunk } from "features/todolistLists/todolists/todolist-actions";

const todoListId1 = v1();
const todoListId2 = v1();
let startState: TasksStateType;

beforeEach(() => {
  startState = {
    [todoListId1]: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.New,
        todoListId: todoListId1,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.New,
        todoListId: todoListId1,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.Completed,
        todoListId: todoListId1,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "4",
        title: "RESTApi",
        status: TaskStatuses.Completed,
        todoListId: todoListId1,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "5",
        title: "GraphQL",
        status: TaskStatuses.New,
        todoListId: todoListId1,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriorities.Low,
      },
    ],
    [todoListId2]: [
      {
        id: "1",
        title: "Angular",
        status: TaskStatuses.New,
        todoListId: todoListId2,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "C++",
        status: TaskStatuses.New,
        todoListId: todoListId2,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "Python",
        status: TaskStatuses.Completed,
        todoListId: todoListId2,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test("task in correct todolist should be removed", () => {
  const params = { todoListId: todoListId1, taskId: "3" };
  const action = tasksThunk.removeTask.fulfilled(
    params,
    "name/removeTask",
    params
  );
  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1].length).toBe(4);
  expect(endState[todoListId1][2].title).toBe("RESTApi");
  expect(endState[todoListId2].length).toBe(3);
});

test("task should be added in correct todolist", () => {
  const newTaskTitle = "Skala";
  const params = {
    todoListId: todoListId2,
    title: newTaskTitle,
    status: TaskStatuses.New,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    startDate: "",
    priority: TaskPriorities.Low,
    id: "4",
  };
  const action = tasksThunk.addTask.fulfilled(params, "name/addTask", params);
  const endState = tasksReducer(startState, action);

  expect(endState[todoListId2].length).toBe(4);
  expect(endState[todoListId2][0].title).toBe(newTaskTitle);
  expect(endState[todoListId2][0].status).toBe(TaskStatuses.New);
});

test("status in correct task should be changed", () => {
  const params = {
    todoListId: todoListId1,
    taskId: "1",
    domainModel: {
      status: TaskStatuses.Completed,
    },
  };
  const action = tasksThunk.updateTask.fulfilled(
    params,
    "name/updateTask",
    params
  );
  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1][0].id).toBe("1");
  expect(endState[todoListId1][0].status).toBe(TaskStatuses.Completed);
});

test("title in correct task should be changed", () => {
  const title = "Awesome";
  const params = {
    todoListId: todoListId2,
    taskId: "3",
    domainModel: {
      title: title,
    },
  };
  const action = tasksThunk.updateTask.fulfilled(
    params,
    "name/updateTask",
    params
  );
  const endState = tasksReducer(startState, action);

  expect(endState[todoListId2][2].title).toBe(title);
  expect(endState[todoListId2][2].status).toBe(TaskStatuses.Completed);
});

test("new array should be added when new todolist is added", () => {
  const payload = {
    todoList: {
      id: v1(),
      title: "new todolist",
      addedDate: "",
      order: 0,
    },
  };

  const action = todoListThunk.addTodoList.fulfilled(
    payload.todoList,
    "name/addTodoList",
    payload.todoList.title
  );
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todoListId1 && k !== todoListId2);
  if (!newKey) {
    throw new Error("Error");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const action = todoListThunk.removeTodolist.fulfilled(
    todoListId2,
    "name/removeTodolist",
    todoListId2
  );
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todoListId2]).toBeUndefined();
});

test("empty array should be added when set todolist", () => {
  const initialState = [
    { id: "1", title: "What I learn", order: 0, addedDate: "" },
    { id: "2", title: "What You learn", order: 0, addedDate: "" },
  ];
  const action = todoListThunk.fetchTodoLists.fulfilled(
    initialState,
    "name/fetchTodoLists",
    undefined
  );

  const endState = tasksReducer({}, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});

test("task should be added for todolist", () => {
  const action = tasksThunk.fetchTasks.fulfilled(
    {
      todoListId: todoListId1,
      tasks: startState[todoListId1],
    },
    "name/fetchTasks",
    todoListId1
  );

  const endState = tasksReducer(
    {
      [todoListId2]: [],
      [todoListId1]: [],
    },
    action
  );

  expect(endState[todoListId1].length).toBe(5);
  expect(endState[todoListId2].length).toBe(0);
});
