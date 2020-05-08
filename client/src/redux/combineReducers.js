import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import fetchReducers from "./reducers/fetchReducers";
import sessionReducers from "./reducers/sessionReducers";

const combinedReducers = combineReducers({
  fetchReducers: fetchReducers,
  sessionReducers: sessionReducers,
  router: routerReducer
});
export default combinedReducers;