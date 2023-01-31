import React, {useReducer} from 'react';
import './App.css';
import {AddItemForm} from "./component/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    initialTodolistState,
    removeTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    updateTaskAC,
    initialTasksState,
    removeTaskAC,
    tasksReducer, updateTaskTC, UpdateDomainTaskModelType,
} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, UpdateTaskModelType} from "./api/todolist-api";


function AppWithReducers() {


    const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer, initialTodolistState)
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, initialTasksState)

//todolists
    const removeTodolist = (todoListId: string) => {
        dispatchToTodolist(removeTodoListAC(todoListId))
    }

    const addTodoList = (title: string) => {
        dispatchToTodolist(addTodoListAC({
            id: '111',
            title: title,
            addedDate: '',
            order: 0
        }))
        dispatchToTasks(addTodoListAC({
            id: '111',
            title: title,
            addedDate: '',
            order: 0
        }))
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatchToTodolist(changeTodoListTitleAC(todoListId, title))
    }

    const changeFilterTask = (todoListId: string, value: FilterValuesType) => {
        dispatchToTodolist(changeTodoListFilterAC(todoListId, value))
    }

//tasks

    const removeTask = (todoListId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(todoListId, taskId))
    }


    const addTask = (todoListId: string, title: string) => {
        dispatchToTasks(addTaskAC({
                todoListId: todoListId,
                title: title,
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                id: '4'
            })
        )
    }


    const changeTaskStatus = (todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatchToTasks(updateTaskAC(todoListId, taskId, {status}))
    }


    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatchToTasks(updateTaskAC(todoListId, taskId, {title}))
    }


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let taskForTodolist = tasks[tl.id]
                        if (tl.filter === 'Active') {
                            taskForTodolist = tasks[tl.id].filter(t => !t.status)
                        }
                        if (tl.filter === 'Completed') {
                            taskForTodolist = tasks[tl.id].filter(t => t.status)
                        }
                        return <Grid item>
                            <Paper elevation={3} style={{padding: '10px'}}>
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
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
