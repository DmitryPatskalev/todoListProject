import {
	 addTaskAC,
	 changeTaskStatusAC,
	 changeTaskTitleAC,
	 removeTaskAC, setTasksAC,
	 tasksReducer,
	 TasksStateType
} from "./tasks-reducer";

import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, setTodoListAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const todoListId1 = v1()
const todoListId2 = v1()
let startState: TasksStateType

beforeEach(() => {
	 startState = {
			[todoListId1]: [
				 {
						id: '1',
						title: 'HTML&CSS',
						status: TaskStatuses.New,
						todoListId: todoListId1,
						addedDate: '',
						deadline: '',
						description: '',
						order: 0,
						startDate: '',
						priority: TaskPriorities.Low
				 },
				 {
						id: '2',
						title: 'JS',
						status: TaskStatuses.New,
						todoListId: todoListId1,
						addedDate: '',
						deadline: '',
						description: '',
						order: 0,
						startDate: '',
						priority: TaskPriorities.Low
				 },
				 {
						id: '3',
						title: 'React',
						status: TaskStatuses.Completed,
						todoListId: todoListId1,
						addedDate: '',
						deadline: '',
						description: '',
						order: 0,
						startDate: '',
						priority: TaskPriorities.Low
				 },
				 {
						id: '4',
						title: 'RESTApi',
						status: TaskStatuses.Completed,
						todoListId: todoListId1,
						addedDate: '',
						deadline: '',
						description: '',
						order: 0,
						startDate: '',
						priority: TaskPriorities.Low
				 },
				 {
						id: '5',
						title: 'GraphQL',
						status: TaskStatuses.New,
						todoListId: todoListId1,
						addedDate: '',
						deadline: '',
						description: '',
						order: 0,
						startDate: '',
						priority: TaskPriorities.Low
				 },
			],
			[todoListId2]: [
				 {
						id: '1',
						title: 'Angular',
						status: TaskStatuses.New,
						todoListId: todoListId2,
						addedDate: '',
						deadline: '',
						description: '',
						order: 0,
						startDate: '',
						priority: TaskPriorities.Low
				 },
				 {
						id: '2',
						title: 'C++',
						status: TaskStatuses.New,
						todoListId: todoListId2,
						addedDate: '',
						deadline: '',
						description: '',
						order: 0,
						startDate: '',
						priority: TaskPriorities.Low
				 },
				 {
						id: '3',
						title: 'Python',
						status: TaskStatuses.Completed,
						todoListId: todoListId2,
						addedDate: '',
						deadline: '',
						description: '',
						order: 0,
						startDate: '',
						priority: TaskPriorities.Low
				 },
			]
	 }
})

test('task in correct todolist should be removed', () => {

	 const action = removeTaskAC(todoListId1, '3')
	 const endState = tasksReducer(startState, action)

	 expect(endState[todoListId1].length).toBe(4)
	 expect(endState[todoListId1][2].title).toBe('RESTApi')
	 expect(endState[todoListId2].length).toBe(3)
})

test('task should be added in correct todolist', () => {

	 const newTaskTitle = 'Skala'
	 const action = addTaskAC(todoListId2, newTaskTitle)
	 const endState = tasksReducer(startState, action)

	 expect(endState[todoListId2].length).toBe(4)
	 expect(endState[todoListId2][0].title).toBe(newTaskTitle)
	 expect(endState[todoListId2][0].status).toBe(TaskStatuses.New)
})

test('status in correct task should be changed', () => {

	 const action = changeTaskStatusAC(todoListId1, '1', TaskStatuses.Completed)
	 const endState = tasksReducer(startState, action)

	 expect(endState[todoListId1][0].id).toBe('1')
	 expect(endState[todoListId1][0].status).toBe(TaskStatuses.Completed)
})

test('title in correct task should be changed', () => {

	 const newTaskTitle = 'Awesome'
	 const action = changeTaskTitleAC(todoListId2, '3', newTaskTitle)
	 const endState = tasksReducer(startState, action)

	 expect(endState[todoListId2][2].title).toBe(newTaskTitle)
	 expect(endState[todoListId2][2].status).toBe(TaskStatuses.Completed)
})

test('new array should be added when new todolist is added', () => {

	 const action = addTodoListAC('new todolist')
	 const endState = tasksReducer(startState, action)

	 const keys = Object.keys(endState)
	 const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)
	 if (!newKey) {
			throw new Error('Error')
	 }
	 expect(keys.length).toBe(3)
	 expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {

	 const action = removeTodoListAC(todoListId2)
	 const endState = tasksReducer(startState, action)

	 const keys = Object.keys(endState)

	 expect(keys.length).toBe(1)
	 expect(endState[todoListId2]).toBeUndefined()
})

test('empty array should be added when set todolist', () => {

	 const action = setTodoListAC([
			{id: '1', title: 'What I learn', order: 0, addedDate: ''},
			{id: '2', title: 'What You learn', order: 0, addedDate: ''}
	 ])

	 const endState = tasksReducer({}, action)
	 const keys = Object.keys(endState)

	 expect(keys.length).toBe(2)
	 expect(endState['1']).toStrictEqual([])
	 expect(endState['2']).toStrictEqual([])
})

test('task should be added for todolist', () => {
	 const action = setTasksAC(todoListId1, startState[todoListId1])

	 const endState = tasksReducer({
			[todoListId2]: [],
			[todoListId1]: []
	 }, action)

	 expect(endState[todoListId1].length).toBe(5)
	 expect(endState[todoListId2].length).toBe(0)
})