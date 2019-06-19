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
                            {this.props.pageName}
                        </a>
                    </div>
                </nav>
            </div>
        );
    }
}
export default searchBar;
