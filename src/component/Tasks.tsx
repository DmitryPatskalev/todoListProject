import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {
	 changeTaskStatusAC,
	 changeTaskStatusTC,
	 changeTaskTitleAC,
	 removeTaskAC,
	 removeTaskTC
} from "../state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../state/store";
import {FilterValuesType} from "../state/todolists-reducer";
import {TaskStatuses} from "../api/todolist-api";


export type TasksPropsType = {
	 todoListId: string
	 filter: FilterValuesType
}

export const Tasks: React.FC<TasksPropsType> = React.memo(({todoListId, filter}) => {
	 // console.log('Tasks is called')

	 const tasks = useAppSelector(state => state.tasks[todoListId])
	 const dispatch = useAppDispatch()

	 let taskForTodolist = tasks
	 if (filter === 'Active') {
			taskForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
	 }
	 if (filter === 'Completed') {
			taskForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
	 }

	 return (
		 <>
				{taskForTodolist.map(t => {

					 const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
							dispatch(changeTaskStatusTC(todoListId, t.id,
								event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
					 }

					 const deleteTasks = () => {
							dispatch(removeTaskTC(todoListId, t.id))
					 }

					 const changeTitle = (title: string) => {
							dispatch(changeTaskTitleAC(todoListId, t.id, title))
					 }

					 return <div key={t.id} className={t.status === TaskStatuses.Completed ? 'is-done' : ''}>
							<Checkbox
								color={'primary'}
								checked={t.status === TaskStatuses.Completed}
								onChange={changeStatus}
							/>
							<EditableSpan onChange={changeTitle} title={t.title}/>
							<IconButton onClick={deleteTasks}>
								 <Delete/>
							</IconButton>
					 </div>
				})}
		 </>
	 );
});

