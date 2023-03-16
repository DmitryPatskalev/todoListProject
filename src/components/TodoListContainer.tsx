import React, { useCallback, useEffect } from "react";
import { Container, Grid, LinearProgress, Paper } from "@material-ui/core";
import { AddItemForm } from "./AddItemForm/AddItemForm";
import { TodoList } from "../features/todolists/TodoList";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  addTodoListTC,
  changeTodoListTitleTC,
  removeTodolistTC,
  fetchTodoListsTC,
} from "../state/todolist_reducer/todolists-reducer";
import "./../app/App.css";
import { Navigate } from "react-router-dom";
import { addTaskTC } from "../state/task_reducer/tasks-reducer";

type PropsType = {
  demo?: boolean;
};
export const TodoListContainer: React.FC<PropsType> = React.memo(({ demo }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.app.status);
  const todoLists = useAppSelector((state) => state.todoLists);
  const tasks = useAppSelector((state) => state.tasks);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

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
