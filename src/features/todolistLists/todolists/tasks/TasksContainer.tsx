import React, { useCallback } from "react";
import { useActions } from "app/store";
import { TodoListDomainType } from "features/todolistLists/todolists-reducer";
import { Tasks } from "features/todolistLists/todolists/tasks/Tasks";
import { TaskStatuses, TaskType } from "api/api-types";
import { removeTask, updateTask } from "./tasks-actions";
import { tasksActions } from "./index";

type TasksContainerType = {
  todoList: TodoListDomainType;
  tasks: Array<TaskType>;
};

export const TasksContainer: React.FC<TasksContainerType> = ({
  todoList,
  tasks,
}) => {
  const { removeTask, updateTask } = useActions(tasksActions);

  const changeTaskStatus = useCallback(
    (todoListId: string, taskId: string, status: TaskStatuses) => {
      updateTask({
        todoListId,
        taskId,
        domainModel: {
          status,
        },
      });
    },
    []
  );

  const changeTaskTitle = useCallback(
    (todoListId: string, taskId: string, title: string) => {
      updateTask({ todoListId, taskId, domainModel: { title } });
    },
    []
  );

  const deleteTask = useCallback((todolistId: string, taskId: string) => {
    removeTask({ todoListId: todolistId, taskId: taskId });
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
          removeTask={deleteTask}
          changeTaskTitle={changeTaskTitle}
          changeTaskStatus={changeTaskStatus}
        />
      ))}
    </>
  );
};
