import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./component/TodoList";
import {FilterValueType} from "./component/ButtonFilterTasks";
import {AddItemForm} from "./component/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
	 addTodoListAC,
	 changeTodoListFilterAC,
	 changeTodoListTitleAC,
	 removeTodoListAC,
	 todoListArray,
	 todolistsReducer
} from "./state/todolists-reducer";
import {
	 addTaskAC,
	 changeTaskStatusAC,
	 changeTaskTitleAC,
	 removeTaskAC,
	 tasksArray,
	 tasksReducer,
} from "./state/tasks-reducer";


function AppWithReducers() {


	 const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer, todoListArray)
	 const [tasks, dispatchToTasks] = useReducer(tasksReducer, tasksArray)

//todolists
	 const removeTodolist = (todoListId: string) => {
			dispatchToTodolist(removeTodoListAC(todoListId))
	 }

	 const addTodoList = (title: string) => {
			dispatchToTodolist(addTodoListAC(title))
			dispatchToTasks(addTodoListAC(title))
	 }

	 const changeTodoListTitle = (todoListId: string, title: string) => {
			dispatchToTodolist(changeTodoListTitleAC(todoListId, title))
	 }

	 const changeFilterTask = (todoListId: string, value: FilterValueType) => {
			dispatchToTodolist(changeTodoListFilterAC(todoListId,value))
	 }

//tasks

	 const removeTask = (todoListId: string, taskId: string) => {
			dispatchToTasks(removeTaskAC(todoListId,taskId))
	 }


	 const addTask = (todoListId: string, title: string) => {
			dispatchToTasks(addTaskAC(todoListId,title))
	 }


	 const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
			dispatchToTasks(changeTaskStatusAC(todoListId,taskId,isDone))
	 }


	 const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
			dispatchToTasks(changeTaskTitleAC(todoListId,taskId,title))
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
										taskForTodolist = tasks[tl.id].filter(t => !t.isDone)
								 }
								 if (tl.filter === 'Completed') {
										taskForTodolist = tasks[tl.id].filter(t => t.isDone)
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
