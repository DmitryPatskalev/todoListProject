import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import {
  FilterValuesType,
  todolistsActions,
} from "features/todolistLists/todolists-reducer";
import { useAppDispatch } from "app/store";

export type FilterChangeTasksType = {
  todoListId: string;
  filter: FilterValuesType;
};

export const ButtonFilterTasks: React.FC<FilterChangeTasksType> = React.memo(
  ({ todoListId, filter }) => {
    // console.log('ButtonFilterTasks is called')

    const dispatch = useAppDispatch();

    const onAllButton = useCallback(() => {
      dispatch(
        todolistsActions.changeTodoListFilterAC({
          todoListId,
          filter: "All",
        })
      );
    }, [todoListId]);

    const onActiveButton = useCallback(() => {
      dispatch(
        todolistsActions.changeTodoListFilterAC({
          todoListId,
          filter: "Active",
        })
      );
    }, [todoListId]);

    const onCompletedButton = useCallback(() => {
      dispatch(
        todolistsActions.changeTodoListFilterAC({
          todoListId,
          filter: "Completed",
        })
      );
    }, [todoListId]);

    return (
      <div>
        <Button
          onClick={onAllButton}
          variant={filter === "All" ? "contained" : undefined}
          color={"primary"}
        >
          All
        </Button>
        <Button
          onClick={onActiveButton}
          variant={filter === "Active" ? "contained" : undefined}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          onClick={onCompletedButton}
          variant={filter === "Completed" ? "contained" : undefined}
          color={"primary"}
        >
          Completed
        </Button>
      </div>
    );
  }
);
