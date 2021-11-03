import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./containers/Home";
import "uikit/dist/css/uikit.min.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById("root")
);
