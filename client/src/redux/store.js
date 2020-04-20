import { createStore, applyMiddleware } from 'redux';
import fetchReducers from "./reducers/fetchReducers";
import thunk from "redux-thunk";

import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(fetchReducers, applyMiddleware(thunk));
// For ReduxDev tools - usage 1.2 at - http://extension.remotedev.io/#usage
const store = createStore(fetchReducers, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
  ));

export default store;