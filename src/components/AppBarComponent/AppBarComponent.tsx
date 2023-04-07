import React, { useCallback } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "app/store";
import { logOutTC } from "features/login/login-reducer";
import { selectIsLoggedIn } from "features/login/login-selectors";

export const AppBarComponent = React.memo(() => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // console.log('AppBarComponent is called')

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC());
  }, []);

  return (
    <AppBar position={"static"}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">News</Typography>
        {isLoggedIn && (
          <Button onClick={logOutHandler} color="inherit">
            LogOut
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
});