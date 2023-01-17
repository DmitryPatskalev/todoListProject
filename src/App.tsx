import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {TodoList} from "./component/TodoList";
import {v1} from "uuid";
import {TasksType} from "./component/Tasks";
import {FilterValueType} from "./component/ButtonFilterTasks";


export type TodoListType = {
	 [key: string]: Array<TasksType>
}

export type TodoListArrayType = {
	 id: string
	 title: string
	 filter: FilterValueType
}

function App() {

	 const todoListId1 = v1()
	 const todoListId2 = v1()

	 const todoListArray: Array<TodoListArrayType> = [
			{id: todoListId1, title: 'What I learn', filter: 'All'},
			{id: todoListId2, title: 'What You learn', filter: 'All'},
	 ]

	 const tasksArray = {
			[todoListId1]: [
				 {id: v1(), title: 'HTML&CSS', isDone: true},
				 {id: v1(), title: 'JS', isDone: true},
				 {id: v1(), title: 'React', isDone: false},
				 {id: v1(), title: 'RESTApi', isDone: false},
				 {id: v1(), title: 'GraphQL', isDone: true},
			],
			[todoListId2]: [
				 {id: v1(), title: 'Angular', isDone: true},
				 {id: v1(), title: 'C++', isDone: true},
				 {id: v1(), title: 'Python', isDone: false},
			]
	 }

	 const [todoLists, setTodoLists] = useState(todoListArray)
	 const [tasks, setTasks] = useState<TodoListType>(tasksArray)


	 const removeTask = (todoListId: string, taskId: string) => {
			setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
	 }

	 const removeTodolist = (todoListId: string) => {
			setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
			delete tasks[todoListId]
			setTasks({...tasks})
	 }

	 const changeFilterTask = (todoListId: string, value: FilterValueType) => {
			setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
	 }

	 const addTask = (todoListId: string, title: string) => {
			let newTask = {
				 id: v1(),
				 title,
				 isDone: false
			}
			tasks[todoListId] = [newTask, ...tasks[todoListId]]
			setTasks({...tasks})
	 }


	 const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
			setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
	 }


	 return (
		 <div className="App">
				{todoLists.map(tl => {

					 let taskForTodolist = tasks[tl.id]
					 if (tl.filter === 'Active') {
							taskForTodolist = tasks[tl.id].filter(t => !t.isDone)
					 }
					 if (tl.filter === 'Completed') {
							taskForTodolist = tasks[tl.id].filter(t => t.isDone)
					 }
					 return <TodoList
						 key={tl.id}
						 todoListId={tl.id}
						 todoListTitle={tl.title}
						 tasks={taskForTodolist}
						 removeTask={removeTask}
						 changeFilterTask={changeFilterTask}
						 addTask={addTask}
						 changeTaskStatus={changeTaskStatus}
						 filter={tl.filter}
						 removeTodolist={removeTodolist}
					 />
				})}

		 </div>
	 );
}

export default App;
