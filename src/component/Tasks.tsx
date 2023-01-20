import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TasksType = {
	 id: string
	 title: string
	 isDone: boolean
}

export type TasksPropsType = {
	 todoListId: string
	 tasks: TasksType[]
	 removeTask: (todoListId: string, id: string) => void
	 changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
	 changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
}

export const Tasks: React.FC<TasksPropsType> = ({tasks, removeTask, changeTaskStatus, todoListId, changeTaskTitle}) => {

	 return (
		 <>
				{tasks.map(t => {
					 const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
							changeTaskStatus(todoListId, t.id, event.currentTarget.checked)
					 }
					 const deleteTasks = () => {
							removeTask(todoListId, t.id)
					 }
					 const changeTitle = (title: string) => {
							changeTaskTitle(todoListId, t.id, title)
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

