import React, { Component } from 'react';
import { emojify } from 'react-emojione';

// Modals
import NewStatement from '../../Modals/addNewStatement'
import NewCategory from '../../Modals/addNewCategory'
import NewUsers from '../../Modals/addNewUsers'

class TopNav extends Component {
  // onClick show Statement
  // isDashboardPage === false
  showStatement = () => {
    this.props.isDashboardPage(false)
    this.props.isStatementPage(true)
    this.props.isTransactionPage(false)
  }
  showTransaction = () => {
    this.props.isDashboardPage(false)
    this.props.isStatementPage(false)
    this.props.isTransactionPage(true)  
  }

  render() {
    return (
      <div className="row w-100">

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
                {/* Transaction */}
                <li>
                  <a className="waves-effect waves-light tooltipped"
                    data-position="bottom" data-tooltip="View statement" onClick={this.showTransaction}>
                    <i className="material-icons light-blue-text text-lighten-4">assessment</i></a>
                </li>
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
                {/* User options */}
                <li>
                  <a className="waves-effect waves-light dropdown-trigger"
                    data-target="dropdown1">
                    <i className="material-icons">more_vert</i></a>
                </li>
              </ul>
            </div>
          </nav>

          <ul id='dropdown1' className='dropdown-content'>
            <li><a href="#!">Profile</a></li>
            <li className="divider" tabIndex="-1"></li>
            <li>
              <a className="waves-effect waves-light modal-trigger" href="#NewUsers">
                Users
              </a>
            </li>
            <li className="divider" tabIndex="-1"></li>
            <li><a href="/login/">Log out</a></li>
          </ul>

          <NewStatement />
          <NewCategory />
          <NewUsers />
        </div>
    );
  }
}

export default TopNav;



/*
  Left slideout
  <li>
    <a data-target="slideoutLeft"
      data-position="bottom" data-tooltip="Profile preferences"
      className="tooltipped mx-0 sidenav-trigger waves-effect waves-light show-on-medium-and-up show-on-medium-and-down">
      <i className="material-icons">tune</i></a>
  </li>
  Right slideout
  <li>
    <a data-target="slideoutRight"
      data-position="bottom" data-tooltip="Display preferences"
      className="tooltipped mx-0 sidenav-trigger waves-effect waves-light show-on-medium-and-up show-on-medium-and-down">
      <i className="material-icons">settings_overscan</i></a>
  </li>
*/

