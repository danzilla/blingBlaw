import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
// combinedReducers 
import combinedReducers from "./combineReducers";
// const store = createStore(fetchReducers, applyMiddleware(thunk));
// For ReduxDev tools - usage 1.2 at - http://extension.remotedev.io/#usage
const store = createStore(combinedReducers, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
  ));
export default store;