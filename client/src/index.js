// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';



// Routers
import ErrorM from './routes/error/ErrorM';
import Dashboard from './routes/dashboard/Dashboard';
import Register from './routes/register/Register';
import Login from './routes/login/Login';

const routing = (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Dashboard} />
            <Route path='/404' component={ErrorM} />
            <Redirect from='*' to='/404' />
        </Switch>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
