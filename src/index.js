import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>,
  document.getElementById("root")
);
