import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <MemoryRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </MemoryRouter>,
  document.getElementById("root")
);
