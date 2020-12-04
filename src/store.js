import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};
const middleware = [ReduxThunk];

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, enhancer);
export default store;
