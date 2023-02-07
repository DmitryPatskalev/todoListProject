import React, {useCallback, useEffect} from "react";
import {ButtonFilterTasks} from "../../components/ButtonFilterTasks";
import {Tasks} from "../tasks/Tasks";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskTC, fetchTasksTC} from "../../state/task_reducer/tasks-reducer";
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodolistTC,
    FilterValuesType
} from "../../state/todolist_reducer/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";


export type TodoListPropsType = {
    todoListId: string
    todoListTitle: string
    filter: FilterValuesType
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     todoListId,
                                                                     todoListTitle,
                                                                     filter,
                                                                 }) => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)


    useEffect(() => {
        dispatch(fetchTasksTC(todoListId))
    }, [])

    const deleteTodoList = useCallback(() => {
        dispatch(deleteTodolistTC(todoListId))
    }, [])

    const addNewTask = useCallback((title: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [])

    const changeTodoTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleTC(todoListId, title))
    }, [])

    const changeFilterTask = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }, [])

    return (
        <div>
            <h3>
                <EditableSpan title={todoListTitle} onChange={changeTodoTitle}/>

                <IconButton onClick={deleteTodoList} disabled={status === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm addItem={addNewTask} disabled={status === 'loading'}/>
            </div>

            <Tasks
                todoListId={todoListId}
                filter={filter}
            />

            <div>
                <ButtonFilterTasks
                    todoListId={todoListId}
                    changeFilterTask={changeFilterTask}
                    filter={filter}
                />
            </div>
        </div>
    )
})