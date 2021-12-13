import React from "react";

const Hello = () => {
  const [name, setName] = React.useState("");
  return (
    <div>
      <h1 data-testid="my-heading">Hello</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => console.log("Button clicked!")}>Click</button>
    </div>
  );
};

export default Hello;
