import React, { Component } from 'react';
import { emojify } from 'react-emojione';
// Navigation
import TopNav from '../../component/Navigation/topNav/topNav';
// Global-Style Materialize
import Materialize from '../../util/Materialize';
// Content 
import Content from './content';
// Dashboard
class Dashboard extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0 
    };
  }
  // Rrrr
  render() {
    return (
      <div className="row w-100 h-100">
        <div className="h-10 w-100 grey lighten-3">
          <div className="container">
            <TopNav />
          </div>
        </div>
        {/* Content */}
        <div className="h-90 col l12 m12 s12 overflowY grey lighten-2">
          <div className="container">
            <div className="card card-1 z-depth-4 p-1">
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
// Dashboard
export default Dashboard;
