import React, { Component } from 'react'
import { emojify } from 'react-emojione';

import Card from './users/Cards'

// Global-Style Materialize
import Materialize from '../../util/Materialize'

import Nav from '../../component/Navigation/smallTopNav'
import Nav1 from '../../component/Navigation/topNav/topNav'
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
      <div className="h-100">

        {/* Navigation */}
        <div className="row w-100 p-1 m-0">
          <div className="col s12 m4 l4"> <Nav /> </div>
          <div className="col s12 m8 l8"> <Nav1 /> </div>
        </div>

        <div className="m-0">
          <h5 class="center-align m-0">This should be center aligned</h5>
        </div>

        {/* Content */}
        <div className="row w-100 h-85">
          
          {/* Logs and Category - hide-on-med-and-down */}
          <div className="col s12 m12 l4 h-100 overflowN hide-on-med-and-down">
            <div className="row h-100 p-1">

              {/* Feature - Profile */}
              <div className="col s12 m12 l12 h-50 card-1 z-depth-3 overflowN my-1">
                <h1>Category</h1>
                <ViewUserList />
              </div>
              {/* Feature - Most spended */}
              <div className="col s12 m12 l12 h-45 card-1 z-depth-3 overflowN">
                <h1>Logs</h1>
                <ViewUserList />
              </div>

            </div>
          </div>

          {/* Contents */}
          <div className="col s12 m12 l8 h-100 overflowN">
            <div className="row h-100 p-2">

              {/* Feature - Profile */}
              <div className="col s12 m12 l12 h-100 card-1 z-depth-3 overflowN">
                <h1>Content</h1>
                <ViewUserList />
              </div>

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



