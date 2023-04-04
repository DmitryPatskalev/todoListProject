import React, { useCallback } from "react";
import { ButtonFilterTasks } from "features/todolistLists/todolists/ButtonFilterTasks";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import {
  FilterValuesType,
  TodoListDomainType,
  todolistsActions,
} from "features/todolistLists/todolists-reducer";
import { useActions, useAppDispatch } from "app/store";
import { TasksContainer } from "features/todolistLists/todolists/tasks/TasksContainer";
import { TaskType } from "api/api-types";
import { tasksActions, todoListActions } from "./index";

export type TodoListPropsType = {
  todoList: TodoListDomainType;
  tasks: Array<TaskType>;
  demo?: boolean;
};

export const TodoList: React.FC<TodoListPropsType> = React.memo(
  ({ todoList, tasks }) => {
    const dispatch = useAppDispatch();

    const { removeTodolist, changeTodoListTitle } = useActions(todoListActions);
    const { addTask } = useActions(tasksActions);

    const addNewItem = useCallback(
      (title: string) => {
        addTask({ todoListId: todoList.id, title });
      },
      [todoList.id]
    );

    const removeTodoList = useCallback(() => {
      removeTodolist(todoList.id);
    }, [todoList.id]);

    const changeTodolistTitle = useCallback(
      (title: string) => {
        changeTodoListTitle({ todoListId: todoList.id, title });
      },
      [todoList.id]
    );

    return (
      <div>
        <h3>
          <EditableSpan title={todoList.title} onChange={changeTodolistTitle} />

          <IconButton
            onClick={removeTodoList}
            disabled={todoList.entityStatus === "loading"}
          >
            <Delete />
          </IconButton>
        </h3>

        <div>
          <AddItemForm
            addItem={addNewItem}
            disabled={todoList.entityStatus === "loading"}
          />
        </div>

        <TasksContainer todoList={todoList} tasks={tasks} />

        <div>
          <ButtonFilterTasks
            todoListId={todoList.id}
            filter={todoList.filter}
          />
        </div>
      </div>
    );
  }
);
