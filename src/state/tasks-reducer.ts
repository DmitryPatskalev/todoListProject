import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

export type TasksType = {
	 id: string
	 title: string
	 isDone: boolean
}

export type TasksStateType = {
	 [key: string]: Array<TasksType>
}

export const tasksArray: TasksStateType = {}


const initialTasksState = tasksArray

export const tasksReducer = (state: TasksStateType = initialTasksState, action: TasksActionType): TasksStateType => {
	 switch (action.type) {

			case "REMOVE_TASK":
				 return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}

			case "ADD_TASK":
				 let newTask = {id: v1(), title: action.title, isDone: false}
				 state[action.todoListId] = [newTask, ...state[action.todoListId]]
				 return {...state}

			case "CHANGE_TASK_STATUS":
				 return {
						...state,
						[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
							 ...t,
							 isDone: action.isDone
						} : t)
				 }

			case "CHANGE_TASK_TITLE":
				 return {
						...state,
						[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
							 ...t,
							 title: action.title
						} : t)
				 }

			case 'ADD_TODOLIST':
				 const stateCopy = {...state}
				 stateCopy[action.todoListId] = []
				 return stateCopy

			case "REMOVE_TODOLIST":
				 const copyState = {...state}
				 delete copyState[action.todoListId]
				 return copyState

			default:
				 return state
	 }
}

export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE_TASK', todoListId, taskId} as const)
export const addTaskAC = (todoListId: string, title: string) => ({type: 'ADD_TASK', todoListId, title} as const)
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => ({
	 type: 'CHANGE_TASK_STATUS',
	 todoListId,
	 taskId,
	 isDone
} as const)
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => ({
	 type: 'CHANGE_TASK_TITLE',
	 todoListId,
	 taskId,
	 title
} as const)

export type TasksActionType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof changeTaskStatusAC>
	| ReturnType<typeof changeTaskTitleAC>
	| ReturnType<typeof addTodoListAC>
	| ReturnType<typeof removeTodoListAC>
