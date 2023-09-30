import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, increaseBy } from "../../modules/counter";
import { RootState } from "../../modules";

// container Component의 로직은 Hook으로 분리할 수 있다.
const useCounter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = useCallback(() => {
    dispatch(increase());
  }, [dispatch]);

  const onDecrease = useCallback(() => {
    dispatch(decrease());
  }, [dispatch]);

  const onIncreaseBy = useCallback(
    (diff: number) => {
      dispatch(increaseBy(diff));
    },
    [dispatch]
  );

  return {
    count,
    onIncrease,
    onDecrease,
    onIncreaseBy,
  };
};

export default useCounter;
