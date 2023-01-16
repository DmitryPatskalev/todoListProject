import React, {ChangeEvent} from "react";
import {ButtonFilterTasks, FilterValueType} from "./ButtonFilterTasks";
import {Input} from "./Input";
import {Tasks, TasksType} from "./Tasks";


export type TodoListType = {
	 todoListTitle: string
	 taskTitle: string
	 tasks: TasksType[]
	 removeTask: (id: string) => void
	 changeFilterTask: (value: FilterValueType) => void
	 addTask: (title: string) => void
	 onChangeHundler: (event: ChangeEvent<HTMLInputElement>) => void
	 changeTaskStatus: (taskId: string, isDone: boolean) => void
	 filter: FilterValueType
}


export const TodoList: React.FC<TodoListType> = ({
																										todoListTitle,
																										tasks,
																										removeTask,
																										changeFilterTask,
																										addTask,
																										onChangeHundler,
																										taskTitle,
																										changeTaskStatus,
																										filter
																								 }) => {

	 return (
		 <div>
				<h3>{todoListTitle}</h3>

				<div>
					 <Input
						 addTask={addTask}
						 onChangeHundler={onChangeHundler}
						 taskTitle={taskTitle}
					 />
				</div>

				<Tasks
					tasks={tasks}
					removeTask={removeTask}
					changeTaskStatus={changeTaskStatus}
				/>

				<div>
					 <ButtonFilterTasks
						 changeFilterTask={changeFilterTask}
						 filter={filter}
					 />
				</div>
		 </div>
	 )
}