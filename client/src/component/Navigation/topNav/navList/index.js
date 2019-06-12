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
                                <a class="m-0 btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="Dashboard" href="/test">
                                    <i class="material-icons">loyalty</i>
                                </a>
                            </li>
                            <li>
                                <a class="btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="Labels and Category" href="/User">
                                    <i class="material-icons">favorite_border</i>
                                </a>
                            </li>
                            <li>
                                <a class="m-0 btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="Bling Blaw" href="/dashboard">
                                    <i class="material-icons">photo_filter</i>
                                </a>
                            </li>
                            <li>
                                <a class="btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="Settings" href="/profile">
                                    <i class="material-icons">filter_vintage</i>
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
