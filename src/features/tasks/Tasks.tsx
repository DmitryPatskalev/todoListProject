import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolist-api";


export type TasksPropsType = {
    task: TaskType
    todoListId: string
    changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
}

export const Tasks = React.memo((props: TasksPropsType) => {
    // console.log('Tasks is called')
    const onClickHandler = useCallback(() =>
        props.removeTask(props.todoListId, props.task.id), [props.todoListId, props.task.id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked

        props.changeTaskStatus(props.todoListId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.todoListId, props.task.id]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todoListId, props.task.id, newValue)
    }, [props.todoListId, props.task.id]);

    return (
        <>
            <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <Checkbox
                    color={'primary'}
                    checked={props.task.status === TaskStatuses.Completed}
                    onChange={onChangeHandler}
                />
                <EditableSpan onChange={onTitleChangeHandler} title={props.task.title}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </div>

        </>
    );
});

