import React from "react";
import {ButtonFilterTasks, FilterValueType} from "./ButtonFilterTasks";
import {Tasks, TasksType} from "./Tasks";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TodoListType = {
	 todoListId: string
	 todoListTitle: string
	 tasks: TasksType[]
	 removeTask: (todoListId: string, id: string) => void
	 changeFilterTask: (todoListId: string, value: FilterValueType) => void
	 addItem: (todoListId: string, title: string) => void
	 changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
	 filter: FilterValueType
	 removeTodolist: (todoListId: string) => void
	 changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
	 changeTodoListTitle: (todoListId: string, title: string) => void
}


export const TodoList: React.FC<TodoListType> = ({
																										todoListId,
																										todoListTitle,
																										tasks,
																										removeTask,
																										changeFilterTask,
																										addItem,
																										changeTaskStatus,
																										filter,
																										removeTodolist,
																										changeTaskTitle,
																										changeTodoListTitle
																								 }) => {

	 const deleteTodoList = () => {
			removeTodolist(todoListId)
	 }

	 const addNewTask = (title: string) => {
			addItem(todoListId, title)
	 }
	 const changeTodoTitle = (title: string) => {
			changeTodoListTitle(todoListId, title)
	 }


	 return (
		 <div>
				<h3>
					 <EditableSpan title={todoListTitle} onChange={changeTodoTitle}/>
					 <button onClick={deleteTodoList}>x</button>
				</h3>

				<div>
					 <AddItemForm addItem={addNewTask}/>
				</div>

				<Tasks
					todoListId={todoListId}
					tasks={tasks}
					removeTask={removeTask}
					changeTaskStatus={changeTaskStatus}
					changeTaskTitle={changeTaskTitle}
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