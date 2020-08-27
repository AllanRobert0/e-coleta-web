import React, { useState } from "react";
import "./App.css";

import Header from "./Header";

function App() {
  const [counter, setCounter] = useState(0);

  function handleButtonClick() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <Header title={`Ecoleta: ${counter}`} />
      <button type="button" onClick={handleButtonClick}>
        Increment
      </button>
      <h1>Next Level Week</h1>
    </div>
  );
}

export default App;
