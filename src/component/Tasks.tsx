import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {FilterValueType} from "./ButtonFilterTasks";


export type TasksPropsType = {
	 todoListId: string
	 filter: FilterValueType
}

export const Tasks: React.FC<TasksPropsType> = ({todoListId, filter}) => {

	 const tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[todoListId])
	 const dispatch = useDispatch()

	 let taskForTodolist = tasks
	 if (filter === 'Active') {
			taskForTodolist = tasks.filter(t => !t.isDone)
	 }
	 if (filter === 'Completed') {
			taskForTodolist = tasks.filter(t => t.isDone)
	 }

	 return (
		 <>
				{taskForTodolist.map(t => {

					 const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
							dispatch(changeTaskStatusAC(todoListId, t.id, event.currentTarget.checked))
					 }

					 const deleteTasks = () => {
							dispatch(removeTaskAC(todoListId, t.id))
					 }

					 const changeTitle = (title: string) => {
							dispatch(changeTaskTitleAC(todoListId, t.id, title))
					 }

					 return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
							<Checkbox
								color={'primary'}
								checked={t.isDone}
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
};

