import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { useCallback } from "react";
import { Todo, addTodo, removeTodo, toggleTodo } from "../../modules/todos";

const useTodo = (todo?: Todo) => {
  const todos = useSelector((state: RootState) => state.todos);

  const dispatch = useDispatch();

  const handleAddTodo = useCallback(
    (value: string) => {
      if (!value || !value.trim()) return;
      dispatch(addTodo(value));
    },
    [dispatch]
  );

  const handleToggleTodo = useCallback(() => {
    if (!todo) return;
    dispatch(toggleTodo(todo.id));
  }, [todo, dispatch]);

  const handleRemoveTodo = useCallback(() => {
    if (!todo) return;
    dispatch(removeTodo(todo.id));
  }, [todo, dispatch]);

  return {
    todos,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleTodo,
  };
};

export default useTodo;
