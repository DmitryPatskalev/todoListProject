import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "./AddItemForm";
import {TodoList} from "./TodoList";
import {useAppDispatch, useAppSelector} from "../state/store";
import {addTodoListAC, fetchTodoListsTC} from "../state/todolists-reducer";

export const TodoListContainer = React.memo(() => {

	 const todoLists = useAppSelector(state => state.todoLists)
	 const dispatch = useAppDispatch()

	 useEffect(() => {
			dispatch(fetchTodoListsTC())
	 }, [])

	 const addTodoList = useCallback((title: string) => {
			dispatch(addTodoListAC(title))
	 }, [])

	 return (
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
	 );
});
