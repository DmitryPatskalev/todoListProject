import React, { useCallback } from "react";
import { TaskStatuses, TaskType } from "../api/todolist-api";
import {
  removeTaskTC,
  updateTaskTC,
} from "../state/task_reducer/tasks-reducer";
import { useAppDispatch } from "../app/store";
import { TodoListDomainType } from "../state/todolist_reducer/todolists-reducer";
import { Tasks } from "../features/tasks/Tasks";

type TasksContainerType = {
  todoList: TodoListDomainType;
  tasks: Array<TaskType>;
};

export const TasksContainer: React.FC<TasksContainerType> = ({
  todoList,
  tasks,
}) => {
  const dispatch = useAppDispatch();

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todolistId, taskId, { status }));
    },
    []
  );

  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { title }));
    },
    []
  );

  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(removeTaskTC({ todoListId: todolistId, taskId: taskId }));
  }, []);

  let taskForTodolist = tasks;
  if (todoList.filter === "Active") {
    taskForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todoList.filter === "Completed") {
    taskForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <>
      {taskForTodolist.map((t) => (
        <Tasks
          key={t.id}
          task={t}
          todoListId={todoList.id}
          removeTask={removeTask}
          changeTaskTitle={changeTaskTitle}
          changeTaskStatus={changeTaskStatus}
        />
      ))}
    </>
  );
};
