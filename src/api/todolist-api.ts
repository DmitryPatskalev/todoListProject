import axios from "axios";
import {
  LoginParamsType,
  ResponceTasksType,
  ResponceTodolistType,
  TaskType,
  TodoListType,
  UpdateDomainTaskModelType,
} from "api/api-types";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "dc2fde0f-4aec-4896-8f16-87121c195b43",
  },
});

export const todoListAPI = {
  getTodoLists() {
    return instance.get<Array<TodoListType>>("/todo-lists");
  },
  createTodoList(title: string) {
    return instance.post<ResponceTodolistType<{ item: TodoListType }>>(
      "/todo-lists",
      { title }
    );
  },
  deleteTodoList(todolistId: string) {
    return instance.delete<ResponceTodolistType>(`/todo-lists/${todolistId}`);
  },
  updateTodoList(todoListId: string, title: string) {
    return instance.put<ResponceTodolistType<{ title: string }>>(
      `/todo-lists/${todoListId}`,
      { title }
    );
  },
};

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<ResponceTasksType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponceTodolistType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title }
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponceTasksType>(
      `/todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(
    todolistId: string,
    taskId: string,
    model: UpdateDomainTaskModelType
  ) {
    return instance.put<ResponceTodolistType>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponceTodolistType<{ userId?: number }>>(
      "/auth/login",
      data
    );
  },
  logOut() {
    return instance.delete<ResponceTodolistType<{ userId?: number }>>(
      "/auth/login"
    );
  },
  me() {
    return instance.get<
      ResponceTodolistType<{ id: number; email: string; login: string }>
    >("/auth/me");
  },
};
