import React, {ChangeEvent} from 'react';


export type TasksType = {
	 id: string
	 title: string
	 isDone: boolean
}

export type TasksPropsType = {
	 tasks: TasksType[]
	 removeTask: (id: string) => void
	 changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Tasks: React.FC<TasksPropsType> = ({tasks, removeTask, changeTaskStatus}) => {

	 return (
		 <ul>
				{tasks.map(t => {
					 const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
							changeTaskStatus(t.id, event.currentTarget.checked)
					 }
					 const deleteTasks = () => {
							removeTask(t.id)
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

