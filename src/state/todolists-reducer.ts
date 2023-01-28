import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";


export const todoListId1 = v1()
export const todoListId2 = v1()

export const initialTodolistState: Array<TodoListDomainType> = []

export type TodoListDomainType = TodoListType & {
	 filter: FilterValuesType
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export const todolistsReducer = (state: Array<TodoListDomainType> = initialTodolistState,
																 action: TodoListActionsType): Array<TodoListDomainType> => {
	 switch (action.type) {

			case "ADD_TODOLIST":
				 const newTodolist: TodoListDomainType = {
						id: action.todoListId,
						title: action.title,
						addedDate: '',
						order: 0,
						filter:'All'
				 }
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

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => ({
	 type: 'CHANGE_TODOLIST_FILTER',
	 todoListId, filter
} as const)

export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
	 type: 'CHANGE_TODOLIST_TITLE',
	 todoListId,
	 title
} as const)

export type TodoListActionsType =
	| ReturnType<typeof addTodoListAC>
	| ReturnType<typeof removeTodoListAC>
	| ReturnType<typeof changeTodoListFilterAC>
	| ReturnType<typeof changeTodoListTitleAC>