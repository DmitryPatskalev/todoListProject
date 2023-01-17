import React, {ChangeEvent} from "react";
import {ButtonFilterTasks, FilterValueType} from "./ButtonFilterTasks";
import {Input} from "./Input";
import {Tasks, TasksType} from "./Tasks";


export type TodoListType = {
	 todoListId: string
	 todoListTitle: string
	 tasks: TasksType[]
	 removeTask: (todoListId: string, id: string) => void
	 changeFilterTask: (todoListId: string, value: FilterValueType) => void
	 addTask: (todoListId: string, title: string) => void
	 changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
	 filter: FilterValueType
	 removeTodolist: (todoListId: string) => void
}


export const TodoList: React.FC<TodoListType> = ({
																										todoListId,
																										todoListTitle,
																										tasks,
																										removeTask,
																										changeFilterTask,
																										addTask,
																										changeTaskStatus,
																										filter,
																										removeTodolist
																								 }) => {

	 const deleteTodoList = () => {
			removeTodolist(todoListId)
	 }

	 return (
		 <div>
				<h3>{todoListTitle}
					 <button onClick={deleteTodoList}>x</button>
				</h3>


				<div>
					 <Input
						 todoListId={todoListId}
						 addTask={addTask}
					 />
				</div>

				<Tasks
					todoListId={todoListId}
					tasks={tasks}
					removeTask={removeTask}
					changeTaskStatus={changeTaskStatus}
				/>

				<div>
					 <ButtonFilterTasks
						 todoListId={todoListId}
						 changeFilterTask={changeFilterTask}
						 filter={filter}
					 />
				</div>
		 </div>
	 )
}