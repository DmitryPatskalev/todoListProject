import React, { useCallback, useEffect } from "react";
import { Container, Grid, LinearProgress, Paper } from "@material-ui/core";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { TodoList } from "features/todolistLists/todolists/TodoList";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  addTodoListTC,
  changeTodoListTitleTC,
  removeTodolistTC,
  fetchTodoListsTC,
} from "features/todolistLists/todolists-reducer";
import "app/App.css";
import { Navigate } from "react-router-dom";
import { addTaskTC } from "features/todolistLists/tasks-reducer";
import { selectStatus } from "app/app-selectors";
import {
  selectTasks,
  selectTodolist,
} from "features/todolistLists/todolist-tasks-selectors";
import { selectIsLoggedIn } from "features/login/login-selectors";

type PropsType = {
  demo?: boolean;
};
export const TodoListContainer: React.FC<PropsType> = React.memo(({ demo }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const todoLists = useAppSelector(selectTodolist);
  const tasks = useAppSelector(selectTasks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(fetchTodoListsTC());
  }, []);

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(addTaskTC({ todoListId: todolistId, title: title }));
  }, []);

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId));
  }, []);

  const changeTodolistTitle = useCallback(
    (todoListId: string, title: string) => {
      dispatch(changeTodoListTitleTC({ todoListId, title }));
    },
    []
  );

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodoListTC(title));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={"login"} />;
  }

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <Container fixed>
        <Grid container style={{ padding: "15px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((tl) => {
            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <TodoList
                    key={tl.id}
                    todoList={tl}
                    tasks={tasks[tl.id]}
                    addTask={addTask}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    demo={demo}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
});
