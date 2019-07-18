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


      <p>
        {this.props.activeUser}
      </p> 

      <p>
        {this.props.activeFannyPackName} - {this.props.activeFannyPack}
      </p> 
        



        <ViewAccount />
        <ViewAccount />
        <ViewAccount />
        <ViewAccount />
      </div>
    );
  }
}
export default Content;
