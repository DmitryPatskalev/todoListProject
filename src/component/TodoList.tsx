import React, {useCallback} from "react";
import {ButtonFilterTasks, FilterValueType} from "./ButtonFilterTasks";
import {Tasks} from "./Tasks";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "../state/todolists-reducer";


export type TodoListPropsType = {
	 todoListId: string
	 todoListTitle: string
	 filter: FilterValueType
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({
																																		todoListId,
																																		todoListTitle,
																																		filter,
																																 }) => {

	 // console.log('TodoList is called')

	 const dispatch = useDispatch()

	 const deleteTodoList = useCallback(() => {
			dispatch(removeTodoListAC(todoListId))
	 }, [])

	 const addNewTask = useCallback((title: string) => {
			dispatch(addTaskAC(todoListId, title))
	 }, [])

	 const changeTodoTitle = useCallback((title: string) => {
			dispatch(changeTodoListTitleAC(todoListId, title))
	 }, [])

	 const changeFilterTask = useCallback((todoListId: string, value: FilterValueType) => {
			dispatch(changeTodoListFilterAC(todoListId, value))
	 }, [])


	 return (
		 <div>
				<h3>
					 <EditableSpan title={todoListTitle} onChange={changeTodoTitle}/>

					 <IconButton onClick={deleteTodoList}>
							<Delete/>
					 </IconButton>
				</h3>

				<div>
					 <AddItemForm addItem={addNewTask}/>
				</div>

				<Tasks
					todoListId={todoListId}
					filter={filter}
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
})