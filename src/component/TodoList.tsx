import React from "react";
import {ButtonFilterTasks, FilterValueType} from "./ButtonFilterTasks";
import {Input} from "./Input";
import {Tasks, TasksType} from "./Tasks";


export type TodoListType = {
	 title: string
	 tasks: TasksType[]
	 removeTask: (id: string) => void
	 changeFilterTask: (value: FilterValueType) => void
}


export const TodoList: React.FC<TodoListType> = ({title, tasks, removeTask, changeFilterTask}) => {

	 return (
		 <div>
				<h3>{title}</h3>

				<div>
					 <Input/>
				</div>

				<Tasks tasks={tasks} removeTask={removeTask}/>

				<div>
					 <ButtonFilterTasks changeFilterTask={changeFilterTask}/>
				</div>
		 </div>
	 )
}