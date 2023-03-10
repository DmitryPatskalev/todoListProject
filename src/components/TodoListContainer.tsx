import React, {useCallback, useEffect} from 'react';
import {Container, Grid, LinearProgress, Paper} from "@material-ui/core";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {TodoList} from "../features/todolists/TodoList";
import {useAppDispatch, useAppSelector} from "../app/store";
import {
   addTodoListTC,
   changeTodoListFilterAC,
   changeTodoListTitleTC,
   deleteTodolistTC,
   fetchTodoListsTC,
   FilterValuesType
} from "../state/todolist_reducer/todolists-reducer";
import './../app/App.css'
import {Navigate} from "react-router-dom";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../state/task_reducer/tasks-reducer";
import {TaskStatuses} from "../api/todolist-api";

type PropsType = {
   demo?: boolean
}
export const TodoListContainer: React.FC<PropsType> = React.memo(({demo}) => {

   const dispatch = useAppDispatch()
   const status = useAppSelector(state => state.app.status)
   const todoLists = useAppSelector(state => state.todoLists)
   const tasks = useAppSelector(state => state.tasks)
   const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

   useEffect(() => {
      if (demo || !isLoggedIn) {
         return
      }
      dispatch(fetchTodoListsTC())
   }, [])

   const removeTask = useCallback((todolistId: string, taskId: string) => {
      dispatch(removeTaskTC(todolistId, taskId))
   }, [])

   const addTask = useCallback((todolistId: string, title: string) => {
      dispatch(addTaskTC(todolistId, title))
   }, [])

   const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todolistId, taskId, {status}))
   }, [])

   const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string,) => {
      dispatch(updateTaskTC(todolistId, taskId, {title}))
   }, [])

   const changeFilter = useCallback((todolistId: string, value: FilterValuesType,) => {
      dispatch(changeTodoListFilterAC(todolistId, value))
   }, [])

   const removeTodolist = useCallback((todolistId: string) => {
      dispatch(deleteTodolistTC(todolistId))
   }, [])

   const changeTodolistTitle = useCallback((todoListId: string, title: string) => {
      dispatch(changeTodoListTitleTC(todoListId, title))
   }, [])

   const addTodoList = useCallback((title: string) => {
      dispatch(addTodoListTC(title))
   }, [dispatch])

   if (!isLoggedIn) {
      return <Navigate to={'login'}/>
   }

   return (
     <>
        {status === 'loading' && <LinearProgress/>}
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
                         todoList={tl}
                         tasks={tasks[tl.id]}
                         removeTask={removeTask}
                         changeFilter={changeFilter}
                         addTask={addTask}
                         changeTaskStatus={changeStatus}
                         removeTodolist={removeTodolist}
                         changeTaskTitle={changeTaskTitle}
                         changeTodolistTitle={changeTodolistTitle}
                         demo={demo}
                       />
                    </Paper>
                 </Grid>
              })}
           </Grid>
        </Container>
     </>
   );
});





