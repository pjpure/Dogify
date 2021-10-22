import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import UploadForm from "./containers/UploadForm";
import "uikit/dist/css/uikit.min.css";
import "./styles.css";

render(
    <Provider store={store}>
      <UploadForm />
    </Provider>,
  document.getElementById("root")
);
