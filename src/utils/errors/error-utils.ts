import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { ResponceTodolistType } from "api/api-types";

export const handleServiceAppError = <T>(
  data: ResponceTodolistType<T>,
  dispatch: Dispatch
) => {
  if (data.messages.length) {
    dispatch(appActions.setAppErrorAC(data.messages[0]));
  } else {
    dispatch(appActions.setAppErrorAC("Some error occurred"));
  }
  dispatch(appActions.setAppStatusAC("failed"));
};

export const handleNetworkServerError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(appActions.setAppErrorAC(error.message));
  dispatch(appActions.setAppStatusAC("failed"));
};
