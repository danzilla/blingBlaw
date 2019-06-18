import React, { Component } from 'react'
import { emojify } from 'react-emojione';

// Global-Style Materialize
import Materialize from '../../util/Materialize'

import Nav from '../../component/Navigation/smallTopNav'
import ViewUserInfo from './users/viewUserInfo'
import ViewUserList from './users/viewUserList'
import ViewUserRecord from './users/viewUserRecord'

// Profile
class Profile extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      width: 0, 
      height: 0 
    };
  }
  // Rrrr
  render() {
    // Bling
    return (
      <div className="row w-100 h-100 overflowN ">

        {/* Profile and Category */}
        <div className="col s4 m4 l4 h-100 overflowN">
          <div className="row h-100 p-1">
            {/* Nav */}
            <div className="col s12 m12 l12 p-0 card card-1 z-depth-4">
              <Nav />
            </div>
            {/* Feature - Profile */}
            <div className="col s12 m12 l12 h-40 card card-1 z-depth-4 overflowN">
              <ViewUserInfo />
            </div>
            {/* Feature - Most spended */}
            <div className="col s12 m12 l12 h-45 card card-1 z-depth-4 overflowN">
              <ViewUserList />
            </div>
          </div>
        </div>
        
        {/* Content*/}
        <div className="col s8 m8 l8 h-98 overflowN card card-1 z-depth-4">
          <ViewUserList />
        </div>
        
        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}
// Bling
export default Profile;



