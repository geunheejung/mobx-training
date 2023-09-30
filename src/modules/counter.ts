import {
  ActionType,
  createReducer,
  createStandardAction,
} from "typesafe-actions";

// const assertions 해줘야 추후 액션 생성함수를 통해 액션 객체 만들 시 string 원시 타입 대신 리터럴 그대로 추출 됨.
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_BY = "counter/INCREASE_BY";

// 액션 객체의 대해서 따로 타입으로 정의해도 되고, 또는 ReturnType 유틸리티 타입 사용하기.
// 액션 타입을 상수 단언 하였기에, 리터럴 그대로 추론 됨.

export const increase = createStandardAction(INCREASE)();
export const decrease = createStandardAction(DECREASE)();
export const increaseBy = createStandardAction(INCREASE_BY)<number>();
export const createItem = createStandardAction("counter/CREATE_ITEM").map(
  (row) => ({
    payload: {
      id: Math.random(),
      row,
    },
  })
);

// 리듀서, 스토어 등 디스패치에 타입 정의 시 파라미터로 전달 해줘야 함.
const actions = { increase, decrease, increaseBy, createItem };
type CounterAction = ActionType<typeof actions>;

// 상태의 타입과 상태의 초깃값 선언하기.
type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

// 5. 리듀서 작성하기 / useReducer와 동일하다. action의 type에 따라 타입 내로잉을 통해 각 디스패치 처리.
// CounterState, CounterAction 쌍으로 해서 액션 - 타입 매칭 함.
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }),
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
});

export default counter;
