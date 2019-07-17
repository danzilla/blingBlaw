import React, { Component } from 'react';
import ViewAccount from './viewAccount';
// Content
class Content extends Component {
  // props
  constructor(props) {
    super(props)
    this.state = {
      accountPage: ""
    }
  }
  // Raaar
  render() {
    return (
      <div id="Content" className="container">
        {this.props.userSerial}
        {this.props.pageName}
        {this.props.activeFannyPackSerial}

        <ViewAccount />
        <ViewAccount />
        <ViewAccount />
        <ViewAccount />
      </div>
    );
  }
}
export default Content;
