import React, { useEffect } from "react";
import { Container, Grid, LinearProgress, Paper } from "@material-ui/core";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { TodoList } from "features/todolistLists/todolists/TodoList";
import { useActions, useAppSelector } from "app/store";
import "app/App.css";
import { Navigate } from "react-router-dom";
import { selectStatus } from "app/app-selectors";
import {
  selectTasks,
  selectTodolist,
} from "features/todolistLists/todolist-tasks-selectors";
import { selectIsLoggedIn } from "features/login/login-selectors";

import { todoListThunk } from "./todolist-actions";

type PropsType = {
  demo?: boolean;
};
export const TodoListContainer: React.FC<PropsType> = React.memo(({ demo }) => {
  const status = useAppSelector(selectStatus);
  const todoLists = useAppSelector(selectTodolist);
  const tasks = useAppSelector(selectTasks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { addTodoList, fetchTodoLists } = useActions(todoListThunk);

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    fetchTodoLists();
  }, []);

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
