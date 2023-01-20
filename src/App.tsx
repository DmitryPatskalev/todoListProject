import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./component/TodoList";
import {v1} from "uuid";
import {TasksType} from "./component/Tasks";
import {FilterValueType} from "./component/ButtonFilterTasks";
import {AddItemForm} from "./component/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type TodoListType = {
	 [key: string]: Array<TasksType>
}

export type TaskStateType = {
	 id: string
	 title: string
	 filter: FilterValueType
}

function App() {

	 const todoListId1 = v1()
	 const todoListId2 = v1()

	 const todoListArray: Array<TaskStateType> = [
			{id: todoListId1, title: 'What I learn', filter: 'All'},
			{id: todoListId2, title: 'What You learn', filter: 'All'},
	 ]

	 const tasksArray = {
			[todoListId1]: [
				 {id: v1(), title: 'HTML&CSS', isDone: true},
				 {id: v1(), title: 'JS', isDone: true},
				 {id: v1(), title: 'React', isDone: false},
				 {id: v1(), title: 'RESTApi', isDone: false},
				 {id: v1(), title: 'GraphQL', isDone: true},
			],
			[todoListId2]: [
				 {id: v1(), title: 'Angular', isDone: true},
				 {id: v1(), title: 'C++', isDone: true},
				 {id: v1(), title: 'Python', isDone: false},
			]
	 }

	 const [todoLists, setTodoLists] = useState(todoListArray)
	 const [tasks, setTasks] = useState<TodoListType>(tasksArray)


	 const removeTask = (todoListId: string, taskId: string) => {
			setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
	 }

	 const removeTodolist = (todoListId: string) => {
			setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
			delete tasks[todoListId]
			setTasks({...tasks})
	 }

	 const changeFilterTask = (todoListId: string, value: FilterValueType) => {
			setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
	 }

	 const addTask = (todoListId: string, title: string) => {
			let newTask = {
				 id: v1(),
				 title,
				 isDone: false
			}
			tasks[todoListId] = [newTask, ...tasks[todoListId]]
			setTasks({...tasks})
	 }


	 const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
			setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
	 }

	 const addTodoList = (title: string) => {
			const newTodoList: TaskStateType = {
				 id: v1(),
				 title,
				 filter: 'All'
			}
			setTodoLists([newTodoList, ...todoLists])
			setTasks({...tasks, [newTodoList.id]: []})
	 }

	 const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
			setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)})
	 }

	 const changeTodoListTitle = (todoListId: string, title: string) => {
			setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
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
											 <TodoList
												 key={tl.id}
												 todoListId={tl.id}
												 todoListTitle={tl.title}
												 tasks={taskForTodolist}
												 removeTask={removeTask}
												 changeFilterTask={changeFilterTask}
												 addItem={addTask}
												 changeTaskStatus={changeTaskStatus}
												 filter={tl.filter}
												 removeTodolist={removeTodolist}
												 changeTaskTitle={changeTaskTitle}
												 changeTodoListTitle={changeTodoListTitle}
											 />
										</Paper>
								 </Grid>
							})}
					 </Grid>
				</Container>
		 </div>
	 );
}

export default App;
