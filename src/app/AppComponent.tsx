import React from 'react';
import './App.css';
import {AppBarComponent} from "../components/AppBarComponent";
import {TodoListContainer} from "../components/TodoListContainer";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";
import {Error404} from "../utils/Error404";


const AppComponent = React.memo(() => {


    return (
        <div className="App">

            <AppBarComponent/>
            <Routes>
                <Route path={'/'} element={<TodoListContainer/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
})

export default AppComponent;
