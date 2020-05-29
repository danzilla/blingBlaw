// React + Redux_Thunk - UI - BlingBlaw
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// serviceWorker
import * as serviceWorker from './serviceWorker';
// App Containers
import App from "./react/app";
import store from "./redux/store";
// Render to public
ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// Notes
// Redux and Thunk _ notes
/*
  1. Store - Where combines reducers - Combine 
  2. reducers - Where initialState for the reducer - Model
  3. actions - Where Action for the reucer - Control
*/