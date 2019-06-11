import React, { Component } from 'react';
import { emojify } from 'react-emojione';
// Search bar
class searchBar extends Component {
    render() {
        return (
            <div>
                <nav className="col m6 s12 light-blue darken-3">
                    <div className="nav-wrapper">
                        {/* LOGO */}
                        <a href="/dashboard/" className="brand-logo px-1 left tooltipped"
                            data-position="bottom" data-tooltip="Dashboard">
                            {emojify('🚀')}
                        </a>
                        {/* Pull-right - Menu */}
                        <ul className="right">
                            {/* Statements */}
                            <li>
                                <a className="waves-effect waves-light tooltipped"
                                    data-position="bottom" data-tooltip="View statement" onClick={this.showStatement}>
                                    <i className="material-icons light-blue-text text-lighten-4">receipt</i>
                                </a>
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
                                    <i className="material-icons pink-text text-lighten-3">loyalty</i>
                                </a>
                            </li>
                            {/* User options */}
                            <li>
                                <a className="waves-effect waves-light dropdown-trigger" data-target="dropdown1">
                                    <i className="material-icons">more_vert</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* Dropdown */}
                <ul id='dropdown1' className='dropdown-content'>
                    <li><a href="#!">Profile</a></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li>
                        <a className="waves-effect waves-light modal-trigger" href="#NewUsers"> Users </a>
                    </li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><a href="/login/">Log out</a></li>
                </ul>
            </div>
        );
    }
}
export default searchBar;
