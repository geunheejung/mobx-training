import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

import { Todo } from "../../mobx/todo";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  onRemoveTodo: (index: number) => void;
}

function TodoItem({ todo, onRemoveTodo }: TodoItemProps) {
  const handleToggle = useCallback(
    action((...arg: any[]) => {
      todo.toggle();
    }),
    [todo]
  );

  const handleRemove = useCallback(() => {
    onRemoveTodo(todo.id);
  }, [todo, onRemoveTodo]);

  return (
    <li className={`TodoItem ${todo.isFinished ? "done" : ""}`}>
      <span className="text" onClick={handleToggle}>
        {todo.title}
      </span>
      <span className="remove" onClick={handleRemove}>
        (X)
      </span>
    </li>
  );
}

export default observer<TodoItemProps>(TodoItem);
