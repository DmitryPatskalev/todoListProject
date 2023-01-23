import {
	 addTaskAC,
	 changeTaskStatusAC,
	 changeTaskTitleAC,
	 removeTaskAC,
	 tasksReducer,
	 TasksStateType
} from "./tasks-reducer";

import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

const todoListId1 = v1()
const todoListId2 = v1()
let startState: TasksStateType

beforeEach(() => {
	 startState = {
			[todoListId1]: [
				 {id: '1', title: 'HTML&CSS', isDone: true},
				 {id: '2', title: 'JS', isDone: true},
				 {id: '3', title: 'React', isDone: false},
				 {id: '4', title: 'RESTApi', isDone: false},
				 {id: '5', title: 'GraphQL', isDone: true},
			],
			[todoListId2]: [
				 {id: '1', title: 'Angular', isDone: true},
				 {id: '2', title: 'C++', isDone: true},
				 {id: '3', title: 'Python', isDone: false},
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
	 expect(endState[todoListId2][0].isDone).toBeFalsy()
})

test('status in correct task should be changed', () => {

	 const action = changeTaskStatusAC(todoListId1, '1', false)
	 const endState = tasksReducer(startState, action)

	 expect(endState[todoListId1][0].id).toBe('1')
	 expect(endState[todoListId1][0].isDone).toBeFalsy()
})

test('title in correct task should be changed', () => {

	 const newTaskTitle = 'Awesome'
	 const action = changeTaskTitleAC(todoListId2, '3', newTaskTitle)
	 const endState = tasksReducer(startState, action)

	 expect(endState[todoListId2][2].title).toBe(newTaskTitle)
	 expect(endState[todoListId2][2].isDone).toBeFalsy()
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
