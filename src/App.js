import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import Task from "./Components/Task";
import { FaBeer } from "react-icons/fa";

function App() {

  return (
    <div className="App">
      <style>{"body { background-color: lightgrey; }"}</style>
      <Task/>
    </div>
  );
}

export default App;
