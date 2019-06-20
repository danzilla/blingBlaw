import React, { Component } from 'react'

import BodyContent from './body'
import HeadContent from './head'

// Content
class Content extends Component {
    constructor(props) {
      super(props)
      this.state = { Content: "Content"}
    }
  // Raaar
  render() {
    return (
      <div className="row h-100 overflowY">

        <div className="h-10 container">
          <HeadContent pageName={this.props.pageName} />
        </div>
        <div className="h-80 container">
          <BodyContent pageName={this.props.pageName} />
        </div>

      </div>
    );
  }
}
export default Content;
