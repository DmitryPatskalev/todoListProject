import {addTodoListAC, removeTodoListAC, setTodoListAC} from "../todolist_reducer/todolists-reducer";
import {tasksAPI, TaskType, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {setErrorAC, setStatusAC} from "../../app/app-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const initialTasksState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialTasksState, action: TasksActionType): TasksStateType => {
    switch (action.type) {

        case "REMOVE_TASK":
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}

        case "ADD_TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case "UPDATE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t, ...action.model
                } : t)
            }

        case 'ADD_TODOLIST':
            return {...state, [action.todoList.id]: []}

        case "REMOVE_TODOLIST": {
            const copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }

        case "SET_TODOLIST": {
            const copyState = {...state}
            action.todoLists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }

        case "SET_TASKS":
            return {...state, [action.todoListId]: action.tasks}

        default:
            return state
    }
}

//actions
export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE_TASK', todoListId, taskId} as const)

export const addTaskAC = (task: TaskType) => ({type: 'ADD_TASK', task} as const)

export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE_TASK',
    todoListId,
    taskId,
    model
} as const)

export const setTasksAC = (todoListId: string, tasks: Array<TaskType>) => ({
    type: 'SET_TASKS',
    todoListId,
    tasks
} as const)

// thunks
export const fetchTasksTC = (todoListId: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC('loading'))
        const res = await tasksAPI.getTasks(todoListId)
        dispatch(setTasksAC(todoListId, res.data.items))
        dispatch(setStatusAC('succeeded'))
    } catch (e: any) {
        throw new Error(e)
    }
}

export const addTaskTC = (todoListId: string, title: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC('loading'))
        const res = await tasksAPI.createTask(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setErrorAC(res.data.messages[0]))
            } else {
                dispatch(setErrorAC('some error occured'))
            }
            dispatch(setStatusAC('failed'))
        }
    } catch (e: any) {

    }
}

export const removeTaskTC = (todoListId: string, taskId: string): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC('loading'))
        await tasksAPI.deleteTask(todoListId, taskId)
        dispatch(removeTaskAC(todoListId, taskId))
        dispatch(setStatusAC('succeeded'))
    } catch (e: any) {

    }
}

export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType):
    AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find(t => t.id === taskId)
    try {
        dispatch(setStatusAC('loading'))
        if (!task) {
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        await tasksAPI.updateTask(todoListId, taskId, apiModel)
        dispatch(updateTaskAC(todoListId, taskId, domainModel))
        dispatch(setStatusAC('succeeded'))
    } catch (e: any) {

    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


export type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListAC>
    | ReturnType<typeof setTasksAC>
