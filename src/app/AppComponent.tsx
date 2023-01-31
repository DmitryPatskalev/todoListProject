import React from 'react';
import './App.css';
import {AppBarComponent} from "../components/AppBarComponent";
import {TodoListContainer} from "../components/TodoListContainer";
import AppWithReducers from "../trash/AppWithReducers";

const appRed = AppWithReducers


const AppComponent = React.memo(() => {
	 // console.log('AppComponent is called')

	 return (
		 <div className="App">
				<AppBarComponent/>
				<TodoListContainer/>
		 </div>
	 );
})

export default AppComponent;
