import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../modules/todos";
import useTodo from "./useTodo";

function TodoInsert() {
  const [value, setValue] = useState("");

  const { handleAddTodo } = useTodo();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={onChange}
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default TodoInsert;
