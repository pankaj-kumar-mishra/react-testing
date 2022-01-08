import { useState } from "react";
import "./App.css";
import { testAttr } from "./utils";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  const handleIncrement = () => {
    if (error) {
      setError(false);
    }
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setError(true);
    }
  };

  return (
    <div {...testAttr("component-app")} className="App">
      <header className="App-header">
        <h1 {...testAttr("counter-display")}>
          Counter Display <span {...testAttr("count-text")}>{count}</span>
        </h1>
        {error && (
          <h6
            {...testAttr("error-message")}
            style={{ color: "red" }}
            //style={{ color: "red", display: error ? "block" : "none" }}
          >
            the counter can't go below zero
          </h6>
        )}
        <button onClick={handleIncrement} {...testAttr("increment-button")}>
          Increment Button
        </button>
        <button onClick={handleDecrement} {...testAttr("decrement-button")}>
          Increment Button
        </button>
      </header>
    </div>
  );
}

export default App;
