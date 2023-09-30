import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

// reducer의 state, action 객체 가 각 제네릭으로 정의됨.
const rootReducer = combineReducers({ counter, todos });

export default rootReducer;

// rootReducer<S, A> = (S, A) => S
// RootState 타입은 추후 컨테이너 컴포넌트 만들 때 스토어에서 관리하고 있는 상태를 조회하기 위해서 useSelector 사용 시
// state의 대한 타입을 얻을 때 필요함.
export type RootState = ReturnType<typeof rootReducer>;
