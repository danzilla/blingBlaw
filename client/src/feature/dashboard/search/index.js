import React, { Component } from 'react'
// Search
// Search Content
import Content from './content'
class Search extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = { pageDisplay: "pageDisplay" };
  }
  // Rrrr
  render() {
    // Bling
    return (
      // Search
      <div className="row w-100 h-85">
        {/* Logs and Category - hide-on-med-and-down */}
        <div className="col s12 m12 l4 h-100 overflowN hide-on-med-and-down">
          <div className="row h-100 p-1">
            {/* Feature - Search */}
            <div className="col s12 m12 l12 h-50 card-1 z-depth-3 overflowN my-1">
              <h1>Account</h1>
              <h1>{this.props.pageName}</h1>
            </div>
            {/* Feature - Most spended */}
            <div className="col s12 m12 l12 h-45 card-1 z-depth-3 overflowN">
              <h1>Logs</h1>
            </div>
          </div>
        </div>
        {/* Contents */}
        <div className="col s12 m12 l8 h-100 overflowN">
          <div className="row h-100 p-2">
            {/* Feature - Search */}
            <div className="col s12 m12 l12 h-100 card-1 z-depth-3 overflowN">
              <Content pageName={this.props.pageName}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Bling
export default Search;