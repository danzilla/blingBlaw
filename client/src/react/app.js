import React from "react"
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
// React components
import Authentication from './containers/Authentication'
import Dashboard from './containers/Dashboard'
import Test from './containers/_test'
// Features
const Features = (props) => {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Authentication} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/test" exact component={Test} />
          <Redirect from='*' to='/' />
        </Switch>
    </Router>
  );
}
// Export
export default Features