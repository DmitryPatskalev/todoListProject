import React, {useEffect, useState} from "react";
import {todoListAPI} from "../api/todolist-api";

export default {
	 title: 'API',
}


const todolistId = '67f75e5f-ea78-4154-a853-5c9851ccca82'
const titleTodoList = 'NEW'
const newTodoListTitle = 'UPDATED TODOLIST TITLE'

const taskId = '0385b23f-eb86-496d-a89d-7e19f08d086b'
const titleTask =  'NEW TASK'
const NewTitleTask =  'UPDATED TASK'

export const GetTodoList = () => {
	 const [state, setState] = useState<any>(null)

	 useEffect(() => {
			todoListAPI.getTodoLists()
				.then(res => setState(res.data))
	 }, [])
	 return <div>
			{JSON.stringify(state)}
	 </div>
}

export const CreateTodoList = () => {
	 const [state, setState] = useState<any>(null)

	 useEffect(() => {
			todoListAPI.createTodoList(titleTodoList)
				.then(res => setState(res.data))
	 }, [])

	 return <div>
			{JSON.stringify(state)}
	 </div>
}

export const DeleteTodoList = () => {
	 const [state, setState] = useState<any>(null)

	 useEffect(() => {
			todoListAPI.deleteTodoList(todolistId)
				.then(res => setState(res.data))
	 }, [])

	 return <div>
			{JSON.stringify(state)}
	 </div>
}

export const UpdateTodoListTitle = () => {
	 const [state, setState] = useState<any>(null)

	 useEffect(() => {
			todoListAPI.updateTodoList(todolistId, newTodoListTitle)
				.then(res => setState(res.data))
	 }, [])

	 return <div>
			{JSON.stringify(state)}
	 </div>
}

// export const GetTasks = () => {
// 	 const [state, setState] = useState(null)
//
// 	 useEffect(() => {
// 			instance.get(`/todo-lists/${todolistId}/tasks`)
// 				.then(res => setState(res.data))
// 	 }, [])
//
// 	 return <div>
// 			{JSON.stringify(state)}
// 	 </div>
// }
//
// export const CreateTask = () => {
// 	 const [state, setState] = useState<any>(null)
//
// 	 useEffect(() => {
// 			instance.post(`/todo-lists/${todolistId}/tasks`, titleTask)
// 				.then(res => setState(res.data))
// 	 }, [])
//
// 	 return <div>
// 			{JSON.stringify(state)}
// 	 </div>
// }
//
// export const DeleteTask = () => {
// 	 const [state, setState] = useState<any>(null)
//
// 	 useEffect(() => {
// 			instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
// 				.then(res => setState(res.data))
// 	 }, [])
// 	 return <div>
// 			{JSON.stringify(state)}
// 	 </div>
// }
//
// export const UpdateTask = () => {
// 	 const [state, setState] = useState<any>(null)
//
// 	 useEffect(() => {
// 			instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, NewTitleTask)
// 				.then(res => setState(res.data))
// 	 }, [])
//
// 	 return <div>
// 			{JSON.stringify(state)}
// 	 </div>
// }