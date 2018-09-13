import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Ducks/Store";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContainer>
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}
