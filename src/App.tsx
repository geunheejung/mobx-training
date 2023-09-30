import React, { useCallback, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Counter } from "./Counter";
import CounterWithRedux from "./components/CounterWithRedux/Counter";
import Todo from "./components/Todo";

function App() {
  const [counterType, setCounterType] = useState<"useReducer" | "redux">(
    "useReducer"
  );

  const handleClick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newCounterType = e.target.value as "useReducer" | "redux";
    setCounterType(newCounterType);
  }, []);

  const renderCoutner = useMemo(() => {
    switch (counterType) {
      case "redux":
        return <CounterWithRedux />;
      case "useReducer":
        return <Counter />;
      default:
        return;
    }
  }, [counterType]);
  return (
    <div className="App">
      <main>
        <article>
          <fieldset>
            <legend>Counter Type</legend>
            <div>
              {" "}
              <input
                type="radio"
                defaultChecked
                name="counterType"
                id="useReducer"
                value="useReducer"
                onChange={handleClick}
              />
              <label htmlFor="useReducer">React + useReducer</label>
            </div>
            <div>
              <input
                type="radio"
                name="counterType"
                id="redux"
                value="redux"
                onChange={handleClick}
              />
              <label htmlFor="redux">React + Redux</label>
            </div>
          </fieldset>
          {renderCoutner}
        </article>
        <article>
          <Todo />
        </article>
      </main>
    </div>
  );
}

export default App;
