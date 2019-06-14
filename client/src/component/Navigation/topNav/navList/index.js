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
                        <a href="/login/" className="brand-logo px-1 left tooltipped"
                            data-position="bottom" data-tooltip="Dashboard">
                            {emojify('🚀')}
                        </a>
                        {/* Pull-right - Menu */}
                        <ul className="right">
                            <li>
                                <a class="btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="FannyPackz" href="/accounts">
                                    <i class="material-icons red-text text-accent-1">favorite_border</i>
                                </a>
                            </li>
                            <li>
                                <a class="m-0 btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="Labels and Category" href="/dashboard">
                                    <i class="material-icons pink-text text-lighten-1">loyalty</i>
                                </a>
                            </li>
                            <li>
                                <a class="btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="Profile and Settings" href="/profile">
                                    <i class="material-icons amber-text text-darken-2">filter_vintage</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
export default searchBar;
