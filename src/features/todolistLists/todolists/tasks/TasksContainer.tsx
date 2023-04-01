import React, { useCallback } from "react";
import {
  removeTaskTC,
  updateTaskTC,
} from "features/todolistLists/tasks-reducer";
import { useAppDispatch } from "app/store";
import { TodoListDomainType } from "features/todolistLists/todolists-reducer";
import { Tasks } from "features/todolistLists/todolists/tasks/Tasks";
import { TaskStatuses, TaskType } from "api/api-types";

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
    (todoListId: string, taskId: string, status: TaskStatuses) => {
      dispatch(
        updateTaskTC({
          todoListId,
          taskId,
          domainModel: {
            status,
          },
        })
      );
    },
    []
  );

  const changeTaskTitle = useCallback(
    (todoListId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC({ todoListId, taskId, domainModel: { title } }));
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
