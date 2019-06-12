import React, { Component } from 'react'
import { emojify } from 'react-emojione';
// Navigation
import TopNav from '../../component/Navigation/topNav/topNav'
// Global-Style Materialize
import Materialize from '../../util/Materialize'
// AddNewStatement 
import AddNewStatement from './addNewStatement';
// ViewAllStatement
import ViewAllStatement from './viewAllStatement';

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
        <div className="h-10 col l12 m12 s12 grey darken-4">
          <div className="container">
            <TopNav />
          </div>
        </div>
        {/* Content */}
        <div className="h-90 col l12 m12 s12 overflowN">
          <div className="h-90">
            {/* NavBar - AddNewStatement */}
            <div className="container">
              <AddNewStatement />
            </div>
            <hr />
            {/* NavBar - ViewAllStatement */}
            <div className="col m8 l8 h-100 overflowY">
              <ViewAllStatement />
            </div>
            {/* NavBar - ViewAllStatementGraph */}
            <div className="col m4 l4 h-100 overflowY">
              <ViewAllStatement />
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
