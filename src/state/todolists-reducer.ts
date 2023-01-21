import {FilterValueType} from "../component/ButtonFilterTasks";
import {TasksType} from "../component/Tasks";
import {v1} from "uuid";

export type TodoListStateType = {
	 [key: string]: Array<TasksType>
}
export type TodoListType = {
	 id: string
	 title: string
	 filter: FilterValueType
}

export type TodoListActionsType =
	| ReturnType<typeof addTodoListAC>
	| ReturnType<typeof removeTodoListAc>
	| ReturnType<typeof changeTodoListFilterAC>
	| ReturnType<typeof changeTodoListTitleAC>


export const todolistsReducer = (state: TodoListType[], action: TodoListActionsType): TodoListType[] => {
	 switch (action.type) {

			case "ADD_TODOLIST":
				 const newTodolist: TodoListType = {id: v1(), title: action.title, filter: 'All'}
				 return [newTodolist, ...state]

			case "REMOVE_TODOLIST":
				 return state.filter(td => td.id !== action.todoListId)

			case "CHANGE_TODOLIST_FILTER":
				 return state.map(td => td.id === action.todoListId ? {...td, filter: action.filter} : td)

			case "CHANGE_TODOLIST_TITLE":
				 return state.map(td => td.id === action.todoListId ? {...td, title: action.title} : td)

			default:
				 throw new Error('Error')
	 }
}

export const addTodoListAC = (title: string) => ({type: 'ADD_TODOLIST', title} as const)
export const removeTodoListAc = (todoListId: string) => ({type: 'REMOVE_TODOLIST', todoListId} as const)
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValueType) => ({
	 type: 'CHANGE_TODOLIST_FILTER',
	 todoListId, filter
} as const)
export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
	 type: 'CHANGE_TODOLIST_TITLE',
	 todoListId,
	 title
} as const)