export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type TodoListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponceTodolistType<D = {}> = {
  resultCode: 0;
  messages: string[];
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type ResponceTasksType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export const ResultCode = {
  success: 0,
  error: 1,
  captcha: 10,
} as const;
