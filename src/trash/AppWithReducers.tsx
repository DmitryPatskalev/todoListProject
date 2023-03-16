import React, { useReducer } from "react";
import "../app/App.css";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  addTodoListTC,
  changeTodoListFilterAC,
  changeTodoListTitleTC,
  FilterValuesType,
  initialTodolistState,
  removeTodolistTC,
  todolistsReducer,
} from "../state/todolist_reducer/todolists-reducer";
import {
  addTaskTC,
  initialTasksState,
  removeTaskTC,
  tasksReducer,
  updateTaskTC,
} from "../state/task_reducer/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todolist-api";

function AppWithReducers() {
  const [todoLists, dispatchToTodolist] = useReducer(
    todolistsReducer,
    initialTodolistState
  );
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, initialTasksState);

  //todolists
  const removeTodolist = (todoListId: string) => {
    dispatchToTodolist(
      removeTodolistTC.fulfilled(todoListId, "todoListId", todoListId)
    );
  };

  const addTodoList = (title: string) => {
    const payload = {
      id: "111",
      title: title,
      addedDate: "",
      order: 0,
    };
    dispatchToTodolist(
      addTodoListTC.fulfilled(payload, "title", payload.title)
    );
  };

  const changeTodoListTitle = (todoListId: string, title: string) => {
    dispatchToTodolist(
      changeTodoListTitleTC.fulfilled({ todoListId: todoListId, title }, "", {
        todoListId: todoListId,
        title,
      })
    );
  };

  const changeFilterTask = (todoListId: string, value: FilterValuesType) => {
    dispatchToTodolist(changeTodoListFilterAC({ todoListId, filter: value }));
  };

  //tasks

  const removeTask = (todoListId: string, taskId: string) => {
    dispatchToTasks(
      removeTaskTC.fulfilled({ todoListId, taskId }, "", { todoListId, taskId })
    );
  };

  const addTask = (todoListId: string, title: string) => {
    const params = {
      todoListId: todoListId,
      title: title,
      status: TaskStatuses.New,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      startDate: "",
      priority: TaskPriorities.Low,
      id: "4",
    };
    dispatchToTasks(addTaskTC.fulfilled(params, "params", params));
  };

  const changeTaskStatus = (
    todoListId: string,
    taskId: string,
    status: TaskStatuses
  ) => {
    const params = {
      todoListId,
      taskId,
      domainModel: {
        status,
      },
    };
    dispatchToTasks(updateTaskTC.fulfilled(params, "params", params));
  };

  const changeTaskTitle = (
    todoListId: string,
    taskId: string,
    title: string
  ) => {
    const params = {
      todoListId,
      taskId,
      domainModel: {
        title,
      },
    };
    dispatchToTasks(updateTaskTC.fulfilled(params, "params", params));
  };

  return (
    <div className="App">
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "15px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((tl) => {
            let taskForTodolist = tasks[tl.id];
            if (tl.filter === "Active") {
              taskForTodolist = tasks[tl.id].filter((t) => !t.status);
            }
            if (tl.filter === "Completed") {
              taskForTodolist = tasks[tl.id].filter((t) => t.status);
            }
            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  {/*<TodoList*/}
                  {/* key={tl.id}*/}
                  {/* todoListId={tl.id}*/}
                  {/* todoListTitle={tl.title}*/}
                  {/* tasks={taskForTodolist}*/}
                  {/* removeTask={removeTask}*/}
                  {/* changeFilterTask={changeFilterTask}*/}
                  {/* addItem={addTask}*/}
                  {/* changeTaskStatus={changeTaskStatus}*/}
                  {/* filter={tl.filter}*/}
                  {/* removeTodolist={removeTodolist}*/}
                  {/* changeTaskTitle={changeTaskTitle}*/}
                  {/* changeTodoListTitle={changeTodoListTitle}*/}
                  {/*/>*/}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
