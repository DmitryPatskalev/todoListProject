import {addTodoListAC, removeTodoListAC, setTodoListAC} from "./todolists-reducer";
import {tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType, AppThunk} from "./store";


export type TasksStateType = {
	 [key: string]: Array<TaskType>
}

export const initialTasksState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialTasksState, action: TasksActionType): TasksStateType => {
	 switch (action.type) {

			case "REMOVE_TASK": {
				 return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
			}

			case "ADD_TASK": {
				 return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
			}

			case "CHANGE_TASK_STATUS": {
				 return {
						...state,
						[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
							 ...t,
							 status: action.status
						} : t)
				 }
			}

			case "CHANGE_TASK_TITLE": {
				 return {
						...state,
						[action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
							 ...t,
							 title: action.title
						} : t)
				 }
			}

			case 'ADD_TODOLIST': {
				 const stateCopy = {...state}
				 stateCopy[action.todoList.title] = []
				 return stateCopy
			}

			case "REMOVE_TODOLIST": {
				 const copyState = {...state}
				 delete copyState[action.todoListId]
				 return copyState
			}

			case "SET_TODOLIST": {
				 const copyState = {...state}
				 action.todoLists.forEach(tl => {
						copyState[tl.id] = []
				 })
				 return copyState
			}

			case "SET_TASKS": {
				 const copyState = {...state}
				 copyState[action.todoListId] = action.tasks
				 return copyState
			}

			default:
				 return state
	 }
}

export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE_TASK', todoListId, taskId} as const)

export const addTaskAC = (task: TaskType) => ({type: 'ADD_TASK', task} as const)

export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => ({
	 type: 'CHANGE_TASK_STATUS',
	 todoListId,
	 taskId,
	 status
} as const)

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => ({
	 type: 'CHANGE_TASK_TITLE',
	 todoListId,
	 taskId,
	 title
} as const)

export const setTasksAC = (todoListId: string, tasks: Array<TaskType>) => ({
	 type: 'SET_TASKS',
	 todoListId,
	 tasks
} as const)

export const fetchTasksTC = (todoListId: string): AppThunk => async dispatch => {
	 try {
			const res = await tasksAPI.getTasks(todoListId)
			dispatch(setTasksAC(todoListId, res.data.items))
	 } catch (e: any) {
			throw new Error(e)
	 }
}

export const addTaskTC = (todoListId: string, title: string): AppThunk => async dispatch => {
	 try {
			const res = await tasksAPI.createTask(todoListId, title)
			dispatch(addTaskAC(res.data.data.item))
	 } catch (e: any) {
	 }
}

export const removeTaskTC = (todoListId: string, taskId: string): AppThunk => async dispatch => {
	 try {
			await tasksAPI.deleteTask(todoListId, taskId)
			dispatch(removeTaskAC(todoListId, taskId))
	 } catch (e: any) {

	 }
}

// export const changeTaskTitleTC = (todoListId: string, taskId: string, title: UpdateTaskModelType): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
// 	 try {
// 			await tasksAPI.updateTask(todoListId, taskId, title)
// 	 } catch (e: any) {
//
// 	 }
// }

export const changeTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
	 const task = getState().tasks[todoListId].find(t => t.id === taskId)
	 try {
			if (task) {
				 await tasksAPI.updateTask(todoListId, taskId, {
						title: task.title,
						description: task.description,
						status: status,
						priority: task.priority,
						startDate: task.startDate,
						deadline: task.deadline
				 })
				 dispatch(changeTaskStatusAC(todoListId, taskId, status))
			}
	 } catch (e: any) {

	 }
}


export type TasksActionType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof changeTaskStatusAC>
	| ReturnType<typeof changeTaskTitleAC>
	| ReturnType<typeof addTodoListAC>
	| ReturnType<typeof removeTodoListAC>
	| ReturnType<typeof setTodoListAC>
	| ReturnType<typeof setTasksAC>
