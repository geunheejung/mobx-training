import React from "react";
import { Todo } from "../../modules/todos";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import useTodo from "./useTodo";

function TodoList() {
  const { todos } = useTodo();

  if (todos.length === 0) return <p>등록된 항목이 없습니다.</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;
