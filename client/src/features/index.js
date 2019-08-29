// React
import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// Apply Ant-Design in Global
// NOTE: Hope-style apply from Global-Child_componets
import 'antd/dist/antd.css';
// Routers
import Authentication from './authentication';
import Dashboard from './dashboard';
// Features
function Features(props) {
  // Features view
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={Authentication} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Redirect from='*' to='/' />
        </Switch>
    </Router>
  );
}
export default Features;