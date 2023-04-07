import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";

export const handleNetworkServerError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(appActions.setAppError(error.message));
  dispatch(appActions.setAppStatus("failed"));
};
