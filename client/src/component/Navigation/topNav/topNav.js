import React, { Component } from 'react';
import { emojify } from 'react-emojione';

import SearchBar from './search';
import NavList from './navList';

class TopNav extends Component {
  render() {
    return (
      <div className="row w-100 p-1">
          {/* Search */}
          <SearchBar />
          {/* Nav */}
          <NavList />
        </div>
    );
  }
}

export default TopNav;