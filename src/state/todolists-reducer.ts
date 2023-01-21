import {FilterValueType} from "../component/ButtonFilterTasks";
import {v1} from "uuid";

export type TodoListType = {
	 id: string
	 title: string
	 filter: FilterValueType
}

export type TodoListActionsType =
	| ReturnType<typeof addTodoListAC>
	| ReturnType<typeof removeTodoListAC>
	| ReturnType<typeof changeTodoListFilterAC>
	| ReturnType<typeof changeTodoListTitleAC>


export const todolistsReducer = (state: Array<TodoListType>, action: TodoListActionsType): Array<TodoListType> => {
	 switch (action.type) {

			case "ADD_TODOLIST":
				 const newTodolist: TodoListType = {id: action.todoListId, title: action.title, filter: 'All'}
				 return [newTodolist, ...state]

			case "REMOVE_TODOLIST":
				 return state.filter(td => td.id !== action.todoListId)

			case "CHANGE_TODOLIST_FILTER":
				 return state.map(td => td.id === action.todoListId ? {...td, filter: action.filter} : td)

			case "CHANGE_TODOLIST_TITLE":
				 return state.map(td => td.id === action.todoListId ? {...td, title: action.title} : td)

			default:
				 return state
	 }
}

export const addTodoListAC = (title: string) => ({
	 type: 'ADD_TODOLIST', title,
	 todoListId: v1()
} as const)
export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE_TODOLIST', todoListId} as const)
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValueType) => ({
	 type: 'CHANGE_TODOLIST_FILTER',
	 todoListId, filter
} as const)
export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
	 type: 'CHANGE_TODOLIST_TITLE',
	 todoListId,
	 title
} as const)