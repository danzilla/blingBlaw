// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// serviceWorker
import * as serviceWorker from './util/serviceWorker';

// Routers
import ErrorP from './feature/error';
import Login from './feature/authentication';
import User from './feature/user';
import Dashboard from './feature/dashboard';
import Test from './feature/test/test';

const routing = (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/user" component={User} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/test" component={Test} />
            <Route path='/404' component={ErrorP} />
            <Redirect from='*' to='/login' />
        </Switch>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
