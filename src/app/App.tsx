import React, { useEffect } from "react";
import "./App.css";
import { AppBarComponent } from "../components/AppBarComponent";
import { TodoListContainer } from "../components/TodoListContainer";
import { Route, Routes } from "react-router-dom";
import { Login } from "../features/login/Login";
import { Error404 } from "../utils/Error404";
import { isInitializeAppTC } from "./app-reducer";
import { useAppDispatch, useAppSelector } from "./store";
import spinner from "../utils/spinner.svg";
import { ErrorSnackBar } from "../components/ErrorSnackBar/ErrorSnackBar";

const App = React.memo(() => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.app.isInitialized);

  useEffect(() => {
    dispatch(isInitializeAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div>
        <img className={"spinner"} src={spinner} alt={"spinner"} />
      </div>
    );
  }
  return (
    <div className="App">
      <AppBarComponent />
      <Routes>
        <Route path={"/"} element={<TodoListContainer demo={false} />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"*"} element={<Error404 />} />
      </Routes>
      <ErrorSnackBar />
    </div>
  );
});

export default App;
