import React from 'react';
import './App.css';
import {TodoList} from "./component/TodoList";
import {AddItemForm} from "./component/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListAC, TodoListType} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


function AppWithRedux() {

	 const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)

	 const dispatch = useDispatch()

	 const addTodoList = (title: string) => {
			dispatch(addTodoListAC(title))
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
								 return <Grid item>
										<Paper elevation={3} style={{padding: '10px'}}>
											 <TodoList
												 key={tl.id}
												 todoListId={tl.id}
												 todoListTitle={tl.title}
												 filter={tl.filter}
											 />
										</Paper>
								 </Grid>
							})}
					 </Grid>
				</Container>
		 </div>
	 );
}

export default AppWithRedux;
