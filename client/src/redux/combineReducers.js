import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import fetchReducers from "./reducers/fetchReducers";
import sessionReducers from "./reducers/sessionReducers";
import accountDataReducers from "./reducers/accountDataReducers";

const combinedReducers = combineReducers({
  fetchReducers,
  sessionReducers,
  accountDataReducers: accountDataReducers,
  router: routerReducer
});
export default combinedReducers;