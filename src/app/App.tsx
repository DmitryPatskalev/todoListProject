import React, { useEffect } from "react";
import "./App.css";
import { AppBarComponent } from "components/AppBarComponent/AppBarComponent";
import { TodoListContainer } from "features/todolistLists/todolists/TodoListContainer";
import { Route, Routes } from "react-router-dom";
import { Login } from "features/login/Login";
import { Error404 } from "utils/errors/Error404";
import { isInitializeAppTC } from "./app-reducer";
import { useAppDispatch, useAppSelector } from "./store";
import spinner from "utils/img/spinner.svg";
import { ErrorSnackBar } from "components/ErrorSnackBar/ErrorSnackBar";
import { selectIsInitialized } from "app/app-selectors";

const App = React.memo(() => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);

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
