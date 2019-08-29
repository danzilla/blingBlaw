// React - UI BlingBlaw
// NOTE: Implment Redux - State_mangement
import React from 'react';
import ReactDOM from 'react-dom';
// serviceWorker
import * as serviceWorker from './config/serviceWorker';
// Features Container
import Features from './features';
// Render to public - Redux-- need to be implmented
ReactDOM.render(<Features />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();