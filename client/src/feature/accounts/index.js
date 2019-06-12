import React, { Component } from 'react'
import { emojify } from 'react-emojione';
// Navigation
import TopNav from '../../component/Navigation/topNav/topNav'
// Global-Style Materialize
import Materialize from '../../util/Materialize'
// Content 
import Content from './addNewStatement';
// Content2 
import Content2 from './viewAllStatement';

// Profile
class Profile extends Component {
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
          <div className=" h-100">
            <div className="container grey lighten-3 z-depth-5">
              <Content />
            </div>
            <div className="col m8 l8 grey lighten-1">
              <Content2 />
            </div>
            <div className="col m4 l4 grey lighten-5">
              <Content2 />
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
export default Profile;
