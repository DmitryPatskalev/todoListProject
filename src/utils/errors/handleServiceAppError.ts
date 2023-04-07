import { ResponceTodolistType } from "../../api/api-types";
import { Dispatch } from "redux";
import { appActions } from "../../app/app-reducer";

export const handleServiceAppError = <T>(
  data: ResponceTodolistType<T>,
  dispatch: Dispatch
) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError(data.messages[0]));
  } else {
    dispatch(appActions.setAppError("Some error occurred"));
  }
  dispatch(appActions.setAppStatus("failed"));
};
