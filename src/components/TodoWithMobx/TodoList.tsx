import React from "react";
import { observer } from "mobx-react-lite";
import TodoItem from "./TodoItem";
import { TodoList as TodoListState } from "../../mobx/todo";

const TodoList = observer<{ todoList: TodoListState }>(({ todoList }) => {
  if (todoList.todos.length === 0) return <p>등록된 항목이 없습니다.</p>;

  return (
    <ul>
      <li>
        Finished
        {todoList.todos.map((todo) => (
          <TodoItem
            todo={todo}
            onRemoveTodo={todoList.removeTodo}
            key={todo.id}
          />
        ))}
      </li>

      <li>
        UnFinished: <strong>{todoList.unfinishedTodoCount}</strong>
      </li>
    </ul>
  );
});

export default TodoList;
