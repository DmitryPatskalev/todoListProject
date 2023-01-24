import React from 'react';
import './App.css';
import {AppBarComponent} from "./component/AppBarComponent";
import {TodoListContainer} from "./component/TodoListContainer";


const AppWithRedux = React.memo(() => {
	 // console.log('AppWithRedux is called')

	 return (
		 <div className="App">
				<AppBarComponent/>
				<TodoListContainer/>
		 </div>
	 );
})

export default AppWithRedux;
