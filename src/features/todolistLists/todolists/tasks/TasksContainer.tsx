import React from "react";
import { TodoListDomainType } from "features/todolistLists/todolists-reducer";
import { Tasks } from "features/todolistLists/todolists/tasks/Tasks";
import { TaskStatuses, TaskType } from "api/api-types";

type TasksContainerType = {
  todoList: TodoListDomainType;
  tasks: Array<TaskType>;
};

export const TasksContainer: React.FC<TasksContainerType> = React.memo(
  ({ todoList, tasks }) => {
    let taskForTodolist = tasks;
    if (todoList.filter === "Active") {
      taskForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todoList.filter === "Completed") {
      taskForTodolist = tasks.filter(
        (t) => t.status === TaskStatuses.Completed
      );
    }
    return (
      <>
        {taskForTodolist.map((t) => (
          <Tasks key={t.id} task={t} todoListId={todoList.id} />
        ))}
      </>
    );
  }
);
