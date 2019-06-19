import React, { Component } from 'react'
import { emojify } from 'react-emojione';

import Content from './content'

// TestCompo
class TestCompo extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      pageDisplay: "pageDisplay",
      pageName: "Test Page"
    };
  }

  // Rrrr
  render() {
    // Bling
    return (
        // Content 
        <div className="row w-100 h-85">

          {/* Logs and Category - hide-on-med-and-down */}
          <div className="col s12 m12 l4 h-100 overflowN hide-on-med-and-down">
            <div className="row h-100 p-1">

              {/* Feature - TestCompo */}
              <div className="col s12 m12 l12 h-50 card-1 z-depth-3 overflowN my-1">
                <h1>Category</h1>
                <h1>{this.state.pageName}</h1>
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

              {/* Feature - TestCompo */}
              <div className="col s12 m12 l12 h-100 card-1 z-depth-3 overflowN">
                <Content active={this.props.active} />
              </div>

            </div>
          </div>

        </div>
    );
  }
}
// Bling
export default TestCompo;



