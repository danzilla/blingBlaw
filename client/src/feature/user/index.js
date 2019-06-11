// Profile page
// 
// React 
import React, { Component } from 'react';
// Navigation
import TopNav from '../../component/Navigation/topNav/topNav1';
// Global-Style Materialize
import Materialize from '../../util/Materialize';
// Content 
import Content from './content';
// Content 2
import Content2 from './content2';

// User
class User extends Component {
  // state
  constructor(props) {
    super(props)
    this.state = {
      dashboardPage: true
    }
  }
  // Rrrr
  render() {
    return (
      <div className="row h-100 w-100 overflowN">
        {/* Navigation */}
        <div className="container h-10 ">
          <div className="h-100">
            <TopNav />
          </div>
        </div>
        {/* Content */}
        <div className="h-90 ">
          <div className="container h-95">
            <div className="left col m5 h-100 overflowY grey darken-4 blue-text text-lighten-2 p-1 card-1 z-depth-4">
              <Content2 />
            </div>
            <div className="right col m6 h-100 overflowY grey darken-4 blue-text text-lighten-2 p-1 card-1 z-depth-4">
              <Content />
            </div>
          </div>
        </div>
        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}
// Bling
export default User;
