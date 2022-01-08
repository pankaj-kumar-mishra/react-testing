import { useState } from "react";

export const replaceCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
};

function App() {
  const [btnColor, setBtnColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newBtnColor =
    btnColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div className="app-container">
      <div>
        <h1 className="app-title">Color Button App</h1>
        <button
          className="color-btn"
          disabled={disabled}
          onClick={() => setBtnColor(newBtnColor)}
          style={{ backgroundColor: disabled ? "grey" : btnColor }}
        >
          Change To {replaceCamelWithSpaces(newBtnColor)}
        </button>
        <br />
        <br />
        <input
          data-testid="toggle-check"
          type="checkbox"
          id="toggle-btn-checkbox"
          onChange={(e) => setDisabled(e.target.checked)}
        />
        <label htmlFor="toggle-btn-checkbox">Disable Color Button</label>
      </div>
    </div>
  );
}

export default App;
