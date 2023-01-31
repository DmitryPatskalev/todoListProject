import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {removeTaskTC, updateTaskTC} from "../../state/task_reducer/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {FilterValuesType} from "../../state/todolist_reducer/todolists-reducer";
import {TaskStatuses} from "../../api/todolist-api";


export type TasksPropsType = {
    todoListId: string
    filter: FilterValuesType
}

export const Tasks: React.FC<TasksPropsType> = React.memo(({todoListId, filter}) => {
    // console.log('Tasks is called')

    const tasks = useAppSelector(state => state.tasks[todoListId])
    const dispatch = useAppDispatch()

    let taskForTodolist = tasks
    if (filter === 'Active') {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'Completed') {
        taskForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <>
            {taskForTodolist.map(t => {

                const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    dispatch(updateTaskTC(todoListId, t.id,
                        {status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
                }

                const deleteTasks = () => {
                    dispatch(removeTaskTC(todoListId, t.id))
                }

                const changeTitle = (title: string) => {
                    dispatch(updateTaskTC(todoListId, t.id, {title}))
                }

                return <div key={t.id} className={t.status === TaskStatuses.Completed ? 'is-done' : ''}>
                    <Checkbox
                        color={'primary'}
                        checked={t.status === TaskStatuses.Completed}
                        onChange={changeStatus}
                    />
                    <EditableSpan onChange={changeTitle} title={t.title}/>
                    <IconButton onClick={deleteTasks}>
                        <Delete/>
                    </IconButton>
                </div>
            })}
        </>
    );
});

