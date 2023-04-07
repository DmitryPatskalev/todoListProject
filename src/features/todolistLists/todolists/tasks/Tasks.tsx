import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { TaskStatuses, TaskType } from "api/api-types";
import { useActions } from "app/store";
import { tasksThunk } from "features/todolistLists/todolists/tasks/tasks-actions";

export type TasksPropsType = {
  task: TaskType;
  todoListId: string;
};

export const Tasks: React.FC<TasksPropsType> = React.memo(
  ({ task, todoListId }) => {
    const { updateTask, removeTask } = useActions(tasksThunk);

    // console.log('Tasks is called')

    const onClickHandler = useCallback(
      () => removeTask({ todoListId, taskId: task.id }),
      [todoListId, task.id]
    );

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        updateTask({
          todoListId,
          taskId: task.id,
          domainModel: {
            status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
          },
        });
      },
      [todoListId, task.id]
    );

    const onTitleChangeHandler = useCallback(
      (newValue: string) => {
        updateTask({
          todoListId,
          taskId: task.id,
          domainModel: { title: newValue },
        });
      },
      [todoListId, task.id]
    );

    return (
      <>
        <div
          key={task.id}
          className={task.status === TaskStatuses.Completed ? "is-done" : ""}
        >
          <Checkbox
            color={"primary"}
            checked={task.status === TaskStatuses.Completed}
            onChange={onChangeHandler}
          />
          <EditableSpan onChange={onTitleChangeHandler} title={task.title} />
          <IconButton onClick={onClickHandler}>
            <Delete />
          </IconButton>
        </div>
      </>
    );
  }
);
