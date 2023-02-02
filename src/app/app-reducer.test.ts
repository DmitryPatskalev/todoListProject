import {appReducer, InitialAppStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('Error'))

    expect(endState.error).toBe('Error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})