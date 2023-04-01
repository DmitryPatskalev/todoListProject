import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "app/store";
import { appActions } from "app/app-reducer";
import { selectError } from "app/app-selectors";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackBar() {
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const isOpen = error !== null;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppErrorAC(null));
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: "100%", alignItems: "center" }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
}
