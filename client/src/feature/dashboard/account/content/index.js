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
  // show AddAccount button
  showAccountAddButton = () => {
    this.setState({ showAddAccount: true })
  }
  // Hide AddAccount button
  hideAccountAddButton = () => {
    this.setState({ showAddAccount: false })
  }
  // Raaar
  render() {
    return (
      <div className="row h-100 overflowN">
        <div className="col m12 s12 h-100 overflowY">
          {/* Add User */}
          <div className="row card-1">
            <HeadContent
              pageName={this.props.pageName}
              hideAccountAddButton={this.hideAccountAddButton}
              showAccountAddButton={this.showAccountAddButton}
              showAddAccount={this.state.showAddAccount} />
          </div>
          {/* User Body */}
          <div className="row">
            <BodyContent pageName={this.props.pageName} />
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
