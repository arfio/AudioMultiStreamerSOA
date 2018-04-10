import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { createMemoryHistory } from "history";
import { MuiThemeProvider } from "material-ui";
import theme from "./utils/theme";
import Routes from "./utils/routes";
import configureStore from "./store";
import Menu from "./components/Menu";
import Player from "./containers/Player";

const syncHistoryWithStore = (store, history) => {
  const { routing } = store.getState();
  if(routing && routing.location) {
    history.replace(routing.location);
  }
};

const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute("data-container"));
document.body.style = "margin:0;"
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={routerHistory}>
        <div>
          <Player/>
          <Menu/>
          <Routes/>
        </div>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  rootElement
);
