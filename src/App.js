import React from "react";
import logo from "./logo.svg";
import "./App.css";

const data = new Array(100).fill("").map((_, i) => i);

function App() {
  const [state, setState] = React.useState({
    pointerStart: 0,
    pointerEnd: 0,
    pointerStartTime: 0,
    pointerEndTime: 0,
    currScrollPosition: 0
  });

  function handleDragMove({ nativeEvent }) {
    console.log("handleDragMove", nativeEvent.y);
    setState({
      ...state,
      currScrollPosition:
        state.currScrollPosition + (state.pointerStart + nativeEvent.y)
    });
  }

  function handleDragStart({ nativeEvent }) {
    console.log("handleDragStart : ", nativeEvent.y);
    setState({ ...state, pointerStart: nativeEvent.y });
  }
  function handleDragEnd(arg) {
    return function({ nativeEvent }) {
      console.log(arg + "_handleDragEnd : ", nativeEvent.y);
      if (nativeEvent.clientY === state.pointerEnd) return;
      setState({ ...state, pointerEnd: nativeEvent.clientY });
      console.log({ start: state.pointerStart, end: nativeEvent.y });
    };
  }
  return (
    <div className="App">
      <div
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd("up")}
        onPointerCancel={handleDragEnd("cancel")}
        className="roll-wrapper"
      >
        <div
          // style={{ transform: `translateY(${state.currScrollPosition}px)` }}
          className="roll-transform"
        >
          {data.map(el => (
            <div key={el} className="roll-element">
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
