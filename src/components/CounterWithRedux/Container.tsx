import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules";
import { increase, decrease, increaseBy } from "../../modules/counter";
import Counter from "./Presenter";

function CounterContainer() {
  // RootState 타입 정의 해둔 덕분에 편하게 접근함.
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };

  const onDecrease = () => {
    dispatch(decrease());
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
}

export default CounterContainer;
