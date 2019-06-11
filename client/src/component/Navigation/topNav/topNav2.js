import React, { Component } from 'react';
import { emojify } from 'react-emojione';

// TopNav
class TopNav extends Component {
    constructor(props) {
      super(props)
      this.state = {
        Content: "Content"
      }
    }
    render() {
      return (
        <div className="container h-100 p-1">
          {/* Search */}
          <nav className="col m6 s12 px-0 light-blue darken-2">
            <div className="nav-wrapper">
              <form>
                <div className="input-field">
                  <input id="search" type="search" required />
                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>
          </nav>
          {/* Nav */}
          <nav className="col m6 s12 light-blue darken-3 ">
            <div className="nav-wrapper">
              {/* LOGO */}
              <a href="/dashboard/" className="brand-logo px-1 left tooltipped"
                data-position="bottom" data-tooltip="Dashboard">
                {emojify('🚀')} {this.props.lola}
              </a>
              {/* Pull-right - Menu */}
              <ul className="right">
                {/* Statements */}
                <li>
                  <a className="waves-effect waves-light tooltipped"
                    data-position="bottom" data-tooltip="View statement" onClick={this.showStatement}>
                    <i className="material-icons light-blue-text text-lighten-4">receipt</i></a>
                </li>
                {/* FileUpload */}
                <li>
                  <a className="waves-effect waves-light modal-trigger tooltipped"
                    data-position="bottom" data-tooltip="Upload new statement"
                    href="#NewStatement">
                    <i className="material-icons cyan-text text-lighten-4">file_upload</i>
                    </a>
                </li>
                {/* Category */}
                <li>
                  <a className="waves-effect waves-light modal-trigger tooltipped"
                    data-position="bottom" data-tooltip="Labels and categories"
                    href="#NewCategory">
                    <i className="material-icons pink-text text-lighten-3">loyalty</i></a>
                </li>
              </ul>
            </div>
          </nav>
      </div>
      );
    }
  }
export default TopNav;
