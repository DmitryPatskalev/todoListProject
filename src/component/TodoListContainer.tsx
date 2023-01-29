import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "./AddItemForm";
import {TodoList} from "./TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTodoListAC, fetchTodoListsTC, TodoListDomainType} from "../state/todolists-reducer";

export const TodoListContainer = React.memo(() => {

	 const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
	 const dispatch = useDispatch<any>()

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
