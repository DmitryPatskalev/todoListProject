import axios from "axios";


export const instance = axios.create({
	 baseURL: 'https://social-network.samuraijs.com/api/1.1',
	 withCredentials: true,
	 headers: {
			"API-KEY": "dc2fde0f-4aec-4896-8f16-87121c195b43"
	 }
})

const TODO_LISTS = '/todo-lists'

export const todoListAPI = {
	 getTodoLists() {
			return instance.get(TODO_LISTS)
	 },
	 createTodoList(title: string) {
			return instance.post(TODO_LISTS, {title})
	 },
	 deleteTodoList(todolistId: string) {
			return instance.delete(`${TODO_LISTS}/${todolistId}`)
	 },
	 updateTodoList(todolistId: string, title: string) {
			return instance.put(`${TODO_LISTS}/${todolistId}`, {title})
	 }
}