import React, { Component } from 'react'
import { emojify } from 'react-emojione';
// Navigation
import TopNav from '../../component/Navigation/topNav/topNav'
// Global-Style Materialize
import Materialize from '../../util/Materialize'
// User Comboz
import ViewUserInfo from './viewUserInfo'
import ViewUserList from './viewUserList'
import ViewUserRecord from './viewUserRecord'
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
        {/* Navigation */}
        <div className="h-10 col l12 m12 s12 grey lighten-3">
          <div className="container">
            <TopNav />
          </div>
        </div>
        {/* Content */}
        <div className="h-90 col l12 m12 s12 overflowN">
          <div className="container h-98">
            <div className="p-1 h-100">
              {/* H-50 */}
              <div className="row h-50">
                <div className="col m6 s6 h-100 overflowN">
                  <ViewUserInfo />
                </div>
                <div className="col m6 s6 h-100 overflowN">
                  <ViewUserList />
                </div>
              </div>
              {/* H-50 */}
              <div className="row h-50">
                <div className="col m12 s12 h-100 overflowN">
                  <ViewUserRecord />
                </div>
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
