import React, { useEffect, useState } from "react";
import { tasksAPI, todoListAPI } from "../api/todolist-api";

export default {
  title: "API",
};

export const GetTodoList = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todoListAPI.getTodoLists().then((res) => setState(res.data));
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodoList = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("");

  const createTodolist = () => {
    todoListAPI.createTodoList(title).then((res) => setState(res.data));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <button onClick={createTodolist}>create</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const DeleteTodoList = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const deleteTodo = () => {
    todoListAPI.deleteTodoList(todolistId).then((res) => setState(res.data));
  };

  return (
    <div>
      <input
        placeholder="todolistId"
        type="text"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={deleteTodo}>delete</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const UpdateTodoListTitle = () => {
  const [state, setState] = useState<any>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  const updateTodoTitle = () => {
    todoListAPI
      .updateTodoList(todolistId, newTitle)
      .then((res) => setState(res.data));
  };

  return (
    <div>
      <input
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder="todolistId"
        type="text"
      />
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.currentTarget.value)}
        placeholder="newTitle"
        type="text"
      />
      <button onClick={updateTodoTitle}>Update</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const getTasks = () => {
    tasksAPI.getTasks(todolistId).then((res: any) => setState(res.data.items));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="todolistId"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={getTasks}>get tasks</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");

  const addNewTask = () => {
    tasksAPI.createTask(todolistId, newTitle).then((res) => setState(res.data));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="todolistId"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="newTitle"
        value={newTitle}
        onChange={(e) => setNewTitle(e.currentTarget.value)}
      />
      <button onClick={addNewTask}>add new task</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const deleteTask = () => {
    tasksAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data));
  };

  return (
    <div>
      <input
        type="text"
        value={todolistId}
        placeholder="todolistId"
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        type="text"
        value={taskId}
        placeholder="taskId"
        onChange={(e) => setTaskId(e.currentTarget.value)}
      />
      <button onClick={deleteTask}>delete task</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const updateTask = () => {
    tasksAPI
      .updateTask(todolistId, taskId, {
        title,
        description,
        status,
        priority,
        startDate,
        deadline,
      })
      .then((res) => setState(res.data));
  };

  return (
    <div>
      <input
        value={todolistId}
        placeholder="todolistId"
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        value={taskId}
        placeholder="taskId"
        onChange={(e) => setTaskId(e.currentTarget.value)}
      />
      <input
        value={title}
        placeholder="title"
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <input
        value={description}
        placeholder="description"
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <input
        value={status}
        placeholder="status"
        onChange={(e) => setStatus(+e.currentTarget.value)}
      />
      <input
        value={priority}
        placeholder="priority"
        onChange={(e) => setPriority(+e.currentTarget.value)}
      />
      <button onClick={updateTask}>update task</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};
