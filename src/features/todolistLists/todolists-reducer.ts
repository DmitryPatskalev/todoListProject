import { RequestStatusType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoListType } from "api/api-types";
import {
  addTodoList,
  changeTodoListTitle,
  fetchTodoLists,
  removeTodolist,
} from "./todolists/todolist-actions";

export const initialTodolistState: Array<TodoListDomainType> = [];

export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type FilterValuesType = "All" | "Active" | "Completed";

const slice = createSlice({
  name: "todolist",
  initialState: initialTodolistState,
  reducers: {
    changeTodoListFilterAC(
      state,
      action: PayloadAction<{ todoListId: string; filter: FilterValuesType }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todoListId
      );
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{
        todoListId: string;
        entityStatus: RequestStatusType;
      }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todoListId
      );
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus;
      }
    },
    clearTodosDataAC() {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload.map((tl) => ({
          ...tl,
          filter: "All",
          entityStatus: "idle",
        }));
      }
    });
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    });
    builder.addCase(addTodoList.fulfilled, (state, action) => {
      if (action.payload) {
        state.unshift({
          ...action.payload,
          filter: "All",
          entityStatus: "idle",
        });
      }
    });
    builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => {
        if (action.payload) {
          return tl.id === action.payload.todoListId;
        }
      });
      if (index !== -1 && action.payload) {
        state[index].title = action.payload.title;
      }
    });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
