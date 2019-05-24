// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// serviceWorker
import * as serviceWorker from './serviceWorker';

// Routers
import ErrorM from './routes/error/ErrorM';
import Dashboard from './routes/dashboard/Dashboard';
import Login from './routes/authentication/index';

import Test from './routes/test/Dashboard';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path='/404' component={ErrorM} />
            <Route path="/test" component={Test} />
            <Redirect from='*' to='/login' />
        </Switch>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
