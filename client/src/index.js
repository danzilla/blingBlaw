// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// serviceWorker
import * as serviceWorker from './util/serviceWorker';
// Routers
import Login from './feature/authentication';
import Profile from './feature/profile';
import Dashboard from './feature/dashboard';
import errorPages from './feature/errorPages';
import Account from './feature/accounts';
// zzz
const routing = (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/accounts" component={Account} />
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
