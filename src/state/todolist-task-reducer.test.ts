import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodoListAC, TodoListDomainType, todolistsReducer} from "./todolists-reducer";


test('it should be equals', () => {
	 const startTaskState: TasksStateType = {}
	 const startTodolistState: TodoListDomainType[] = []

	 const action = addTodoListAC('new todolist')

	 const endTaskState = tasksReducer(startTaskState, action)
	 const endTodolistState = todolistsReducer(startTodolistState, action)

	 const keys = Object.keys(endTaskState)
	 const idFromTask = keys[0]
	 const idFromTodolist = endTodolistState[0].id

	 expect(idFromTask).toBe(action.todoListId)
	 expect(idFromTodolist).toBe(action.todoListId)


})