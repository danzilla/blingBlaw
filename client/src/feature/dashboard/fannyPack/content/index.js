import React, { Component } from 'react'
// Head and Body
import BodyContent from './body'
import HeadContent from './head'
// Content
class Content extends Component {
  // constructor
  constructor(props) {
    super(props)
    this.state = {
      showAddAccount: false
    }
  }
  // Raaar
  render() {
    return (
      <div className="row h-100 overflowN">
        <div className="col m12 s12 h-100 overflowY">
          {/* Heading - Add FannyPack and Select FannyPack */}
          <div className="row card-1">
            <HeadContent
              pageName={this.props.pageName} />
          </div>
          {/* Body - Add and View Fanny's Accounts */}
          <div className="row">
            <BodyContent pageName={this.props.pageName} />
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
