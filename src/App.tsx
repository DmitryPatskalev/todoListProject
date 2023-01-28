import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./component/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TasksStateType} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodoListDomainType} from "./state/todolists-reducer";


function App() {

	 const todoListId1 = v1()
	 const todoListId2 = v1()

	 const todoListArray: Array<TodoListDomainType> = [
			{id: todoListId1, title: 'What I learn', order: 0, addedDate: '', filter: 'All'},
			{id: todoListId2, title: 'What You learn', order: 0, addedDate: '', filter: 'All'},
	 ]

	 const tasksArray: TasksStateType = {
			[todoListId1]: [
				 {
						id: v1(),
						title: 'HTML&CSS',
						status: TaskStatuses.Completed,
						description: '',
						todoListId: todoListId1,
						priority: TaskPriorities.Low,
						deadline: '',
						startDate: '',
						addedDate: '',
						order: 0
				 },
				 {
						id: v1(),
						title: 'JS',
						status: TaskStatuses.Completed,
						description: '',
						todoListId: todoListId1,
						priority: TaskPriorities.Low,
						deadline: '',
						startDate: '',
						addedDate: '',
						order: 0
				 },
				 {
						id: v1(),
						title: 'React',
						status: TaskStatuses.New,
						description: '',
						todoListId: todoListId1,
						priority: TaskPriorities.Low,
						deadline: '',
						startDate: '',
						addedDate: '',
						order: 0
				 },
			],
			[todoListId2]: [
				 {
						id: v1(),
						title: 'Angular',
						status: TaskStatuses.Completed,
						description: '',
						todoListId: todoListId2,
						priority: TaskPriorities.Low,
						deadline: '',
						startDate: '',
						addedDate: '',
						order: 0
				 },
				 {
						id: v1(),
						title: 'Python',
						status: TaskStatuses.New,
						description: '',
						todoListId: todoListId2,
						priority: TaskPriorities.Low,
						deadline: '',
						startDate: '',
						addedDate: '',
						order: 0
				 },
			]
	 }

	 const [todoLists, setTodoLists] = useState(todoListArray)
	 const [tasks, setTasks] = useState(tasksArray)

//todolists
	 const removeTodolist = (todoListId: string) => {
			setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
			delete tasks[todoListId]
			setTasks({...tasks})
	 }

	 const addTodoList = (title: string) => {
			const newTodoList: TodoListDomainType = {
				 id: v1(),
				 title,
				 order: 0,
				 addedDate: '',
				 filter: 'All'
			}
			setTodoLists([newTodoList, ...todoLists])
			setTasks({...tasks, [newTodoList.id]: []})
	 }

	 const changeTodoListTitle = (todoListId: string, title: string) => {
			setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
	 }

	 const changeFilterTask = (todoListId: string, value: FilterValuesType) => {
			setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
	 }

//tasks

	 const removeTask = (todoListId: string, taskId: string) => {
			setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
	 }


	 const addTask = (todoListId: string, title: string) => {
			let newTask: TaskType = {
				 description: '',
				 title,
				 status: TaskStatuses.New,
				 priority: TaskPriorities.Low,
				 startDate: '',
				 deadline: '',
				 id: v1(),
				 todoListId,
				 order: 0,
				 addedDate: ''
			}
			tasks[todoListId] = [newTask, ...tasks[todoListId]]
			setTasks({...tasks})
	 }


	 const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
			setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
	 }


	 const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
			setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)})
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
										taskForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
								 }
								 if (tl.filter === 'Completed') {
										taskForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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

export default App;
