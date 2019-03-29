import React, { Component } from 'react';


class TopNav extends Component {

    render() {
      
        return (

        <div className="row w-100">
          <div className="container w-100">
            
            {/* Search */}
            <nav className="col m5 s11 px-0">
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
            <nav className="col m7 s11 px-0">
              <div className="nav-wrapper">
                {/* LOGO */}
                <a href="/" className="brand-logo px-1 left">
                  BlingBlaw
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
                    <a><i className="material-icons">code</i></a>
                  </li>
                  <li>
                    <a className='dropdown-trigger' data-target='dropdown1'>
                    <i className="material-icons">bubble_chart</i>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            {/* Dropdown */}
            <ul id='dropdown1' className='dropdown-content w-auto'>
              <li className=" w-auto">
                  <a href="#!" class="collection-item w-auto">asdasdasdasdasdasd</a>
              </li>
              <li>
                <a href="#!" class="collection-item w-auto">asdasdasdasdasdasd</a>
              </li>
            </ul>

          </div>
        </div>

        );
    }
}

export default TopNav;



