import React, {useCallback, useEffect} from 'react';
import {Container, Grid, LinearProgress, Paper} from "@material-ui/core";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {TodoList} from "../features/todolists/TodoList";
import {useAppDispatch, useAppSelector} from "../app/store";
import {addTodoListTC, fetchTodoListsTC} from "../state/todolist_reducer/todolists-reducer";
import {ErrorSnackBar} from "./ErrorSnackBar/ErrorSnackBar";

export const TodoListContainer = React.memo(() => {

   const dispatch = useAppDispatch()
   const todoLists = useAppSelector(state => state.todoLists)
   const status = useAppSelector(state => state.app.status)


   useEffect(() => {
      dispatch(fetchTodoListsTC())
   }, [])

   const addTodoList = useCallback((title: string) => {
      dispatch(addTodoListTC(title))
   }, [])

   return (
       <>
          {status === 'loading' && <LinearProgress/>}
          <Container fixed>
             <ErrorSnackBar/>
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
       </>
   );
});
