import React, {useCallback, useEffect} from "react";
import {ButtonFilterTasks} from "../../components/ButtonFilterTasks";
import {Tasks} from "../tasks/Tasks";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {fetchTasksTC} from "../../state/task_reducer/tasks-reducer";
import {FilterValuesType, TodoListDomainType} from "../../state/todolist_reducer/todolists-reducer";
import {useAppDispatch} from "../../app/store";
import {TaskStatuses, TaskType} from "../../api/todolist-api";


export type TodoListPropsType = {
   todoList: TodoListDomainType
   tasks: Array<TaskType>
   changeFilter: (todoListId: string, value: FilterValuesType) => void
   addTask: (todoListId: string, title: string) => void
   changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
   changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
   removeTask: (todoListId: string, taskId: string) => void
   removeTodolist: (taskId: string) => void
   changeTodolistTitle: (taskId: string, newTitle: string) => void
   demo?: boolean
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({demo = false, ...props}) => {

   const addNewTask = useCallback((title: string) => {
      props.addTask(props.todoList.id, title)
   }, [props.todoList.id, props.addTask])

   const removeTodolist = useCallback(() => {
      props.removeTodolist(props.todoList.id)
   }, [props.todoList.id])

   const changeTodolistTitle = useCallback((title: string) => {
      props.changeTodolistTitle(props.todoList.id, title)
   }, [props.todoList.id, props.changeTodolistTitle])

   let taskForTodolist = props.tasks
   if (props.todoList.filter === 'Active') {
      taskForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
   }
   if (props.todoList.filter === 'Completed') {
      taskForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
   }

   return (
     <div>
        <h3>
           <EditableSpan title={props.todoList.title} onChange={changeTodolistTitle}/>

           <IconButton onClick={removeTodolist} disabled={props.todoList.entityStatus === 'loading'}>
              <Delete/>
           </IconButton>
        </h3>

        <div>
           <AddItemForm addItem={addNewTask} disabled={props.todoList.entityStatus === 'loading'}/>
        </div>
        {taskForTodolist.map(t => <Tasks
          key={t.id}
          task={t}
          todoListId={props.todoList.id}
          removeTask={props.removeTask}
          changeTaskTitle={props.changeTaskTitle}
          changeTaskStatus={props.changeTaskStatus}
        />)}

        <div>
           <ButtonFilterTasks
             todoListId={props.todoList.id}
             changeFilterTask={props.changeFilter}
             filter={props.todoList.filter}
           />
        </div>
     </div>
   )
})