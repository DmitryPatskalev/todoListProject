import React from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export const AppBarComponent = React.memo(() => {
    // console.log('AppBarComponent is called')
    return (
        <AppBar position={'static'}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
});

