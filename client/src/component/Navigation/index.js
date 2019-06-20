import React, { Component } from 'react';
// Nav barz
import NavBar from './navBar';
import SearchBar from './searchBar';
import StatusBar from './statusBar';
// Navigation 
class Nav extends Component {
  render() {
    return (
      // Navigation
      <div className="row w-100 p-1 m-0">
        <div className="col s12 m4 l4"> 
          <NavBar 
            activeAccount={this.props.activeAccount}
            activeCategory={this.props.activeCategory}
            activeSearch={this.props.activeSearch}
            activeSettings={this.props.activeSettings}
            activeUsers={this.props.activeUsers} />
        </div>
        <div className="col s12 m4 l4 px-0"> 
          <StatusBar 
            pageName={this.props.pageName} /> 
        </div>
        <div className="col s12 m4 l4 px-0"> 
          <SearchBar /> 
        </div>
      </div>
    );
  }
}
export default Nav;

