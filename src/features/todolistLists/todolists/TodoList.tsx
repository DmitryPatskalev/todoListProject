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
import { useAppDispatch } from "app/store";
import { TasksContainer } from "features/todolistLists/todolists/tasks/TasksContainer";
import { TaskType } from "api/api-types";

export type TodoListPropsType = {
  todoList: TodoListDomainType;
  tasks: Array<TaskType>;
  addTask: (todoListId: string, title: string) => void;
  removeTodolist: (taskId: string) => void;
  changeTodolistTitle: (taskId: string, newTitle: string) => void;
  demo?: boolean;
};

export const TodoList: React.FC<TodoListPropsType> = React.memo(
  ({ demo = false, ...props }) => {
    const dispatch = useAppDispatch();

    const addNewTask = useCallback(
      (title: string) => {
        props.addTask(props.todoList.id, title);
      },
      [props.todoList.id, props.addTask]
    );

    const changeFilter = useCallback(
      (todoListId: string, filter: FilterValuesType) => {
        dispatch(
          todolistsActions.changeTodoListFilterAC({ todoListId, filter })
        );
      },
      []
    );

    const removeTodolist = useCallback(() => {
      props.removeTodolist(props.todoList.id);
    }, [props.todoList.id]);

    const changeTodolistTitle = useCallback(
      (title: string) => {
        props.changeTodolistTitle(props.todoList.id, title);
      },
      [props.todoList.id, props.changeTodolistTitle]
    );

    return (
      <div>
        <h3>
          <EditableSpan
            title={props.todoList.title}
            onChange={changeTodolistTitle}
          />

          <IconButton
            onClick={removeTodolist}
            disabled={props.todoList.entityStatus === "loading"}
          >
            <Delete />
          </IconButton>
        </h3>

        <div>
          <AddItemForm
            addItem={addNewTask}
            disabled={props.todoList.entityStatus === "loading"}
          />
        </div>

        <TasksContainer todoList={props.todoList} tasks={props.tasks} />

        <div>
          <ButtonFilterTasks
            todoListId={props.todoList.id}
            changeFilterTask={changeFilter}
            filter={props.todoList.filter}
          />
        </div>
      </div>
    );
  }
);
