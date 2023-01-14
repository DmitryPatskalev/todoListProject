import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

function App() {

	 const task1 = [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'React', isDone: false}

	 ]
	 const task2 = [
			{id: v1(), title: 'Angular', isDone: true},
			{id: v1(), title: 'Python', isDone: false},
			{id: v1(), title: 'C++', isDone: true},
	 ]


	 return (
		 <div className="App">
				<TodoList title='What I Learn' tasks={task1}/>
				<TodoList title='What you Learn' tasks={task2}/>
		 </div>
	 );
}

export default App;
