import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { MuiThemeProvider } from "material-ui/styles";

import { Provider } from "react-redux";
import initStore from "./store/store";

import App from "./components/App/App";

const { store, persistor } = initStore();

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider>
          <App />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("app"));
