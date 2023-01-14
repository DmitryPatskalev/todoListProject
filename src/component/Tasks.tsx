import React from 'react';


export type TasksType = {
	 id: string
	 title: string
	 isDone: boolean
}

export type TasksPropsType = {
	 tasks: TasksType[]
	 removeTask: (id: string) => void
}

export const Tasks: React.FC<TasksPropsType> = ({tasks, removeTask}) => {
	 return (
		 <ul>
				{tasks.map(t => {

					 const deleteTasks = () => {
							removeTask(t.id)
					 }

					 return <li key={t.id}>
							<input type="checkbox" checked={t.isDone}/>
							<span>{t.title}</span>
							<button onClick={deleteTasks}>x</button>
					 </li>
				})}
		 </ul>
	 );
};

