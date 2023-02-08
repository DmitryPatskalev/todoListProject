import React, {useCallback, useEffect} from 'react';
import {Container, Grid, LinearProgress, Paper} from "@material-ui/core";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {TodoList} from "../features/todolists/TodoList";
import {useAppDispatch, useAppSelector} from "../app/store";
import {addTodoListTC, fetchTodoListsTC} from "../state/todolist_reducer/todolists-reducer";
import {ErrorSnackBar} from "./ErrorSnackBar/ErrorSnackBar";
import './../app/App.css'
import {Navigate} from "react-router-dom";

type PropsType = {
	 demo?: boolean
}
export const TodoListContainer: React.FC<PropsType> = React.memo(({demo}) => {

	 const dispatch = useAppDispatch()
	 const todoLists = useAppSelector(state => state.todoLists)
	 const status = useAppSelector(state => state.app.status)
	 const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

	 useEffect(() => {
			if (demo || !isLoggedIn) {
				 return
			}
			dispatch(fetchTodoListsTC())
	 }, [])

	 const addTodoList = useCallback((title: string) => {
			dispatch(addTodoListTC(title))
	 }, [])

	 if (!isLoggedIn) {
			return <Navigate to={'login'}/>
	 }

	 return (
		 <>
				{status === 'loading' && <LinearProgress/>}
				<Container fixed>
					 <ErrorSnackBar/>
					 <Grid container style={{padding: '15px'}}>
							<AddItemForm addItem={addTodoList} disabled={status === 'loading'}/>
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
		 </>
	 );
});
