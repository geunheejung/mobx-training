import React from "react";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import store from "../../mobx";

const Todo = () => {
  return <TodoList todoList={store} />;
};

export default Todo;
