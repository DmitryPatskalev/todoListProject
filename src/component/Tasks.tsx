import React, {ChangeEvent} from 'react';


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
}

export const Tasks: React.FC<TasksPropsType> = ({tasks, removeTask, changeTaskStatus, todoListId}) => {

	 return (
		 <ul>
				{tasks.map(t => {
					 const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
							changeTaskStatus(todoListId, t.id, event.currentTarget.checked)
					 }
					 const deleteTasks = () => {
							removeTask(todoListId, t.id)
					 }

					 return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
							<input
								type="checkbox"
								checked={t.isDone}
								onChange={changeStatus}
							/>
							<span>{t.title}</span>
							<button onClick={deleteTasks}>x</button>
					 </li>
				})}
		 </ul>
	 );
};

