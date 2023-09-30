import React, { useCallback } from "react";
import { Todo, removeTodo, toggleTodo } from "../../modules/todos";
import "./TodoItem.css";
import { useDispatch } from "react-redux";
import useTodo from "./useTodo";

type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
  const { handleRemoveTodo, handleToggleTodo } = useTodo(todo);

  return (
    <li className={`TodoItem ${todo.done ? "done" : ""}`}>
      <span className="text" onClick={handleToggleTodo}>
        {todo.text}
      </span>
      <span className="remove" onClick={handleRemoveTodo}>
        (X)
      </span>
    </li>
  );
}

export default TodoItem;
