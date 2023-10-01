import { TodoList, Todo } from "./todo";

const store = new TodoList([
  new Todo("Get Coffee"),
  new Todo("Write Simpler code"),
]);

export default store;
