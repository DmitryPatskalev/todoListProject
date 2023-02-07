import {todoListAPI, TodoListType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleNetworkServerError, handleServiceAppError} from "../../utils/error-utils";


export const initialTodolistState: Array<TodoListDomainType> = []

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export const todolistsReducer = (state: Array<TodoListDomainType> = initialTodolistState,
                                 action: TodoListActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD_TODOLIST": {
            return [{...action.todoList, filter: 'All', entityStatus: 'idle'}, ...state]
        }

        case "REMOVE_TODOLIST": {
            return state.filter(td => td.id !== action.todoListId)
        }

        case "CHANGE_TODOLIST_FILTER": {
            return state.map(td => td.id === action.todoListId ? {...td, filter: action.filter} : td)
        }

        case "CHANGE_TODOLIST_TITLE": {
            return state.map(td => td.id === action.todoListId ? {...td, title: action.title} : td)
        }

        case "CHANGE_TODOLIST_ENTITY_STATUS": {
            return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.entityStatus} : tl)
        }

        case "SET_TODOLIST": {
            return action.todoLists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}))
        }

        default:
            return state
    }
}
//actions
export const addTodoListAC = (todoList: TodoListType) => ({
    type: 'ADD_TODOLIST', todoList
} as const)

export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE_TODOLIST', todoListId} as const)

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    todoListId, filter
} as const)

export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    todoListId,
    title
} as const)

export const setTodoListAC = (todoLists: Array<TodoListType>) => ({type: 'SET_TODOLIST', todoLists} as const)

export const changeTodolistEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE_TODOLIST_ENTITY_STATUS',
    todoListId,
    entityStatus
} as const)

// thunks
export const fetchTodoListsTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListAPI.getTodoLists()
        if (res.data) {
            dispatch(setTodoListAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServiceAppError(res.data, dispatch)
        }
    } catch (error:any) {
        console.log(error)
        handleNetworkServerError(error, dispatch)
    }
}

export const deleteTodolistTC = (todoListId: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
        const res = await todoListAPI.deleteTodoList(todoListId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodoListAC(todoListId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServiceAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleNetworkServerError(error, dispatch)
    }
}

export const addTodoListTC = (title: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListAPI.createTodoList(title)
        if (res.data.resultCode === 0) {
            console.log(res)
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServiceAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleNetworkServerError(error, dispatch)
    }
}

export const changeTodoListTitleTC = (todoListId: string, title: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListAPI.updateTodoList(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(todoListId, title))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServiceAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleNetworkServerError(error, dispatch)
    }
}


export type TodoListActionsType =
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof setTodoListAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>