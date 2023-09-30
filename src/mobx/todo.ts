import { makeObservable, observable, action, computed } from "mobx";

export interface ITodo {
  title: string;
  isFinished: boolean;
}
export type Todos = ITodo[];
class TodoList {
  todos: Todos = [];

  constructor(todos: Todos) {
    makeObservable(this, {
      todos: observable,
      unfinishedTodoCount: computed,
    });
  }

  // todo가 추가되거나 finished 속성 중 하나가 수정될 때 unfinishedTodoCount를 자동으로 업데이트된다.
  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.isFinished).length;
  }
}

class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title: string) {
    // target, 어노테이션 ->  target / 타겟을 observable 객체로 만드는 듯.
    makeObservable(this, {
      title: observable, // 시간에 지남에 따라 변경하려는 속성을 MobX가 추적할 수 있도록 observable로 표시하면 됨.
      finished: observable,
      toggle: action,
    });
  }
  toggle() {
    this.finished = !this.finished;
  }
}
