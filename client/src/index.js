// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

// Routers
import ErrorM from './routes/error/ErrorM';
import Dashboard from './routes/dashboard/Dashboard';
import Register from './routes/register/Register';
import Login from './routes/authentication/index';

import Test from './routes/test/Dashboard';

//Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducer/reducer_1'

let store = createStore(rootReducer)


const routing = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/test" component={Test} />

                <Route path="/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path='/404' component={ErrorM} />
                <Redirect from='*' to='/login' />
            </Switch>
        </Router>
    </Provider>

)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
