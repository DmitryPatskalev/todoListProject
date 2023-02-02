import {appReducer, InitialAppStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('error message should be set', () => {
    const endState = appReducer(startState, setErrorAC('Error'))

    expect(endState.error).toBe('Error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading')
})