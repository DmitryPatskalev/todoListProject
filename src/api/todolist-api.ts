import axios from "axios";


export const instance = axios.create({
	 baseURL: 'https://social-network.samuraijs.com/api/1.1',
	 withCredentials: true,
	 headers: {
			"API-KEY": "dc2fde0f-4aec-4896-8f16-87121c195b43"
	 }
})

type TodoListType = {
	 id: string
	 title: string
	 addedDate: string
	 order: number
}

export type ResponceTodolistType<D = {}> = {
	 resultCode: 0
	 messages: string[],
	 data: D
}

type TasksEntityType = {
	 description: string
	 title: string
	 completed: boolean
	 status: number
	 priority: number
	 startDate: string
	 deadline: string
	 id: string
	 todoListId: string
	 order: number
	 addedDate: string
}

export type ResponceTasksType = {
	 items: TasksEntityType[]
	 totalCount: number
	 error: string | null
}

export type UpdateTaskModelType = {
	 title: string
	 description: string
	 completed: boolean
	 status: number
	 priority: number
	 startDate: string
	 deadline: string
}


const TODO_LISTS = '/todo-lists'
const TASKS = '/tasks'

export const todoListAPI = {
	 getTodoLists() {
			return instance.get<Array<TodoListType>>(TODO_LISTS)
	 },
	 createTodoList(title: string) {
			return instance.post<ResponceTodolistType<{ item: TodoListType }>>(TODO_LISTS, {title})
	 },
	 deleteTodoList(todolistId: string) {
			return instance.delete<ResponceTodolistType>(`${TODO_LISTS}/${todolistId}`)
	 },
	 updateTodoList(todolistId: string, title: string) {
			return instance.put<ResponceTodolistType<{ title: string }>>(`${TODO_LISTS}/${todolistId}`, {title})
	 }
}


export const tasksAPI = {
	 getTasks(todolistId: string) {
			return instance.get<ResponceTasksType>(`${TODO_LISTS}/${todolistId}${TASKS}`)
	 },
	 createTask(todolistId: string, title: string) {
			return instance.post<ResponceTasksType>(`${TODO_LISTS}/${todolistId}${TASKS}`, {title})
	 },
	 deleteTask(todolistId: string, taskId: string) {
			return instance.delete<ResponceTasksType>(`${TODO_LISTS}/${todolistId}${TASKS}/${taskId}`)
	 },
	 updateTask(todolistId: string, taskId: string, title: string) {
			return instance.patch<ResponceTasksType>(`${TODO_LISTS}/${todolistId}${TASKS}/${taskId}`, {title})
	 }
}