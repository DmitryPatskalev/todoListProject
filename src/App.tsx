import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {TodoList} from "./component/TodoList";
import {v1} from "uuid";
import {TasksType} from "./component/Tasks";
import {FilterValueType} from "./component/ButtonFilterTasks";


function App() {

	 const tasksArray = [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'React', isDone: false},
			{id: v1(), title: 'RESTApi', isDone: false},
			{id: v1(), title: 'GraphQL', isDone: true},
	 ]

	 const [tasks, setTasks] = useState<Array<TasksType>>(tasksArray)
	 const [filter, setFilter] = useState<FilterValueType>('All')
	 const [taskTitle, setTaskTitle] = useState<string>('')

	 const removeTask = (taskId: string) => {
			setTasks(tasks.filter(t => t.id !== taskId))
	 }

	 let taskForTodolist = tasks
	 if (filter === 'Active') {
			taskForTodolist = tasks.filter(t => !t.isDone)
	 }
	 if (filter === 'Completed') {
			taskForTodolist = tasks.filter(t => t.isDone)
	 }

	 const changeFilterTask = (value: FilterValueType) => {
			setFilter(value)
	 }
	 const addTask = (title: string) => {
			let newTask = {
				 id: v1(),
				 title,
				 isDone: false
			}
			setTasks([newTask, ...tasks])
			setTaskTitle('')
	 }

	 const onChangeHundler = (event: ChangeEvent<HTMLInputElement>) => {
			setTaskTitle(event.currentTarget.value)
	 }


	 return (
		 <div className="App">
				<TodoList
					todoListTitle='What I Learn'
					tasks={taskForTodolist}
					removeTask={removeTask}
					changeFilterTask={changeFilterTask}
					addTask={addTask}
					onChangeHundler={onChangeHundler}
					taskTitle={taskTitle}
				/>
		 </div>
	 );
}

export default App;
