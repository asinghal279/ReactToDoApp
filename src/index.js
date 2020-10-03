import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.render(
  <React.StrictMode>
    <h1 className="text-center">ToDo App</h1>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
