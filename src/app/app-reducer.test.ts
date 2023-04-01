import { appReducer, AppInitialStateType, appActions } from "./app-reducer";

let startState: AppInitialStateType;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  };
});

test("error message should be set", () => {
  const endState = appReducer(startState, appActions.setAppErrorAC("Error"));

  expect(endState.error).toBe("Error");
});

test("correct status should be set", () => {
  const endState = appReducer(startState, appActions.setAppStatusAC("loading"));

  expect(endState.status).toBe("loading");
});
