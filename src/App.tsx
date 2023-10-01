import React, { useCallback, useMemo, useState } from "react";
import "./App.css";
import { Counter } from "./Counter";
import CounterWithRedux from "./components/CounterWithRedux/Counter";
import TodoWithMobx from "./components/TodoWithMobx";
import TimerView, { myTimer } from "./components/Timer";

const stateType = {
  useReducer: "useReducer",
  redux: "redux",
  mobx: "mobx",
} as const;

type StateTypeKeys = keyof typeof stateType;

function App() {
  const [counterType, setCounterType] = useState<StateTypeKeys>(
    stateType.useReducer
  );

  const handleClick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newCounterType = e.target.value as StateTypeKeys;
    setCounterType(newCounterType);
  }, []);

  const renderCounter = useMemo(() => {
    switch (counterType) {
      case stateType.redux:
        return <CounterWithRedux />;
      case stateType.useReducer:
        return <Counter />;
      case stateType.mobx:
        return (
          <div>
            <TodoWithMobx />
          </div>
        );
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
            {Object.values(stateType).map((row) => (
              <div key={row}>
                <input
                  type="radio"
                  defaultChecked={counterType === row}
                  name="counterType"
                  id={row}
                  value={row}
                  onChange={handleClick}
                />
                <label htmlFor={row}>{row}</label>
              </div>
            ))}
          </fieldset>
          {renderCounter}
        </article>
        <article>
          <TimerView />
        </article>
      </main>
    </div>
  );
}

export default App;
