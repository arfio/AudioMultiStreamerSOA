import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { routerMiddleware, routerReducer as routing, push } from "react-router-redux";
import persistState from "redux-localstorage";
import thunk from "redux-thunk";

import index from "./reducers/index";
import { asyncDispatchMiddleware } from "./middleware/asyncDispatchMiddleware";
import actionList from "./actions/actionList";

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    ...actionList,
    push
  };

  const reducers = {
    index,
    routing
  };

  const middlewares = [ thunk, router, asyncDispatchMiddleware ];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(process.env.NODE_ENV === "development" && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
