import React, { Component } from 'react';
import { emojify } from 'react-emojione';

import NewStatement from '../../Modals/addNewStatement'

class TopNav extends Component {
    render() {
        return (
          <div className="row w-100">
            <div className="container w-100">

              {/* Search */}
              <nav className="col m5 s12 px-0 light-blue darken-2">
                <div className="nav-wrapper">
                  
                  <form>
                    <div className="input-field">
                      <input id="search" type="search" required />
                      <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>

                </div>
              </nav>

              {/* Nav */}
              <nav className="col m7 s12 px-0 light-blue darken-3">
                <div className="nav-wrapper">
                  
                  {/* LOGO */}
                  <a href="/" className="brand-logo px-1 left">
                      {emojify('🔥')}
                  </a>

                  {/* Pull-right - Menu */}
                  <ul className="right">
                    <li>
                      <a data-target="slideoutLeft"
                        data-position="bottom" data-tooltip="Profile preferences"
                        className="tooltipped mx-0 sidenav-trigger waves-effect waves-light show-on-medium-and-up show-on-medium-and-down">
                      <i className="material-icons">tune</i></a>
                    </li>
                    <li>
                      <a data-target="slideoutRight"
                        data-position="bottom" data-tooltip="Display preferences"
                        className="tooltipped mx-0 sidenav-trigger waves-effect waves-light show-on-medium-and-up show-on-medium-and-down">
                      <i className="material-icons">settings_overscan</i></a>
                    </li>
                    <li>
                      <a class="waves-effect waves-light modal-trigger tooltipped"
                        data-position="bottom" data-tooltip="Upload new statement"
                        href="#NewStatement">
                        <i className="material-icons">file_upload</i></a>
                    </li>
                    {/* Need to be update the LOGOUT */}
                    <li>
                      <a class="waves-effect waves-light modal-trigger tooltipped"
                        data-position="bottom" data-tooltip="Sign out"
                        href="/login/">
                        <i className="material-icons">exit_to_app</i></a>
                    </li>
                  </ul>
                </div>
              </nav>

              <NewStatement />
            </div>
          </div>
        );
    }
}

export default TopNav;



