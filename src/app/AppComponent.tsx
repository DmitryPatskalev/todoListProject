import React from 'react';
import './App.css';
import {AppBarComponent} from "../components/AppBarComponent";
import {TodoListContainer} from "../components/TodoListContainer";


const AppComponent = React.memo(() => {

    return (
        <div className="App">
            <AppBarComponent/>
            <TodoListContainer/>
        </div>
    );
})

export default AppComponent;
