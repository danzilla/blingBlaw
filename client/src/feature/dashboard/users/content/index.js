import React, { Component } from 'react'
// Head and Body
import Head from './head'
import Body from './body'
// Content
class Content extends Component {
  // constructor
  constructor(props) {
    super(props)
    this.state = { showAddUser: false }
  }
  // Raaar
  render() {
    return (
      <div className="row h-100 overflowN">
        <div className="col m12 s12 h-100 overflowY">
          {/* Add User */}
          <div className="row card-1">
            <Head 
              updateAlertMessage={this.props.updateAlertMessage}
              pageName={this.props.pageName} />
          </div>
          {/* User Body */}
          <div className="row">
            <div className="container z-depth-4">
              <Body updateAlertMessage={this.props.updateAlertMessage} />
            </div>
          </div>
         </div>
      </div>
    );
  }
}
export default Content;
