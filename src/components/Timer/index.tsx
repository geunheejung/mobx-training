import {autorun, action, makeObservable, observable} from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import {createContext, useContext, ReactNode, useEffect} from "react";

class Timer {
  secondsPassed = 0;

  constructor() {
    makeObservable(this, {
      secondsPassed: observable,
      increaseTimer: action.bound
    });
  }

  increaseTimer() {
    this.secondsPassed++;
  }
}

export const myTimer = new Timer();

export const TimerContext = createContext<Timer>(myTimer);

const Text = observer<{
  prefix: string;
  localTimer?: Timer;
  renderSuffix?: () => ReactNode
}>(({
                           prefix,
                           localTimer,
                           renderSuffix
}) => {
  const timer = useContext(TimerContext);

  console.log(timer.secondsPassed);
  return (
    <div>
      {prefix} - {localTimer ? localTimer.secondsPassed : timer.secondsPassed}
      {renderSuffix && renderSuffix()}
    </div>
  )
});

const useTimer = (offset = 0) => {
  const localTimer = useLocalObservable(() => {
    return {
      secondsPassed: offset,
      increaseTimer() {
        this.secondsPassed++;
      },
    };
  });

  return localTimer
}

// function statement로 주입 하면 devTools에서 네이밍됨.
const TimerView = observer(function TimerView() {
  const timer = useContext(TimerContext);
  // 이론적으로 React의 서스펜스 메커니즘의 일부 기능을 차단할 수 있음.
  // 너무 빨리 의존하지 않는 것이 좋다. -> state가 컴포넌트간 공유되는 도메인 데이터를 캡쳐할 때 사용하기
  //  users, bookings 등등
  // React 컴포넌트 안에서 local observable을 사용하는 것은 깊거나, computed 값이 있거나, 다른 observer 컴포넌트와 공유될 때 가치가 있음.
  const localTimer = useTimer(0);

  useEffect(() => {
    const disposer = autorun(() => {
      if (timer.secondsPassed > 60) alert('Good')
    });

    return () => {
      disposer();
    }
  }, []);

  useEffect(() => {
    // const handle = setInterval(localTimer.increaseTimer, 1000)
    console.log(timer.increaseTimer);
    // timer this 바인딩이 되지 않아서 발생함.
    // const handle2 = setInterval(timer.increaseTimer, 1000);
    return () => {
      // clearInterval(handle);
      // clearInterval(handle2)
    }
  }, []);

  return (
    <div>
      <p>
        {/* 만약 text.secondsPassed 를 props로 내리면 원시값으로 전달 됨 */}
        <Text prefix='Seconds passed' />
      </p>
      <p>
        <Text prefix='Local Seconds passed' localTimer={localTimer} renderSuffix={() => {
          return (

            <button onClick={timer.increaseTimer}>
              {timer.secondsPassed}+
            </button>
          )
        }} />
      </p>
    </div>
  );
});

export default () => {
  return (
    <TimerContext.Provider value={myTimer}>
      <TimerView />
    </TimerContext.Provider>
  );
};
