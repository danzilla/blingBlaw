// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// serviceWorker
import * as serviceWorker from './util/serviceWorker';
// Routers
import ErrorP from './feature/error';
import errorPages from './feature/errorPages';
import Login from './feature/authentication';
import Profile from './feature/profile';
import Dashboard from './feature/dashboard';
import Test from './feature/test/test';
// zzz
const routing = (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/test" component={Test} />
            <Route path='/404' component={ErrorP} />
            <Route path='/404' component={errorPages} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Redirect from='*' to='/login' />
        </Switch>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
