import React from "react";
import { observer } from "mobx-react-lite";
import { ITodo } from "../../mobx/todo";

interface Props {
  todo: ITodo;
}
export const TodoView = observer<Props>(({ todo }) => {
  return (
    <li>
      <input type="chekcbox" />
    </li>
  );
});
