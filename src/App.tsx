import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [prices, setPrices] = useState<number[]>([]);
  const [inputPrice, setInputPrice] = useState(0);
  return (
    <>
      <input
        onChange={(e) => {
          setInputPrice(parseInt(e.target.value));
        }}
      ></input>
      <button
        onClick={() => {
          setPrices([...prices,inputPrice]);
        }}
      ></button>
      <p>{prices}</p>
    </>
  );
}

export default App;
