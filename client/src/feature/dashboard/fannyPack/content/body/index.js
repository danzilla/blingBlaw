import React, { Component } from 'react';

import ViewAccount from './viewAccount';
import ViewFannyPack from './viewFannyPack';
// Content
class Content extends Component {
  // props
  constructor(props) {
    super(props)
    const pageDisplay = {
      viewAccountPage: true,
      viewFannyPackPage: false
    }
    this.state = {
      pageDisplay: pageDisplay
    }
  }
  // activeViewFannyPackPage
  activeViewFannyPackPage = () => {
    this.setState({
      pageDisplay: {
        ...this.state.pageDisplay,
        viewAccountPage: false, viewFannyPackPage: true
      }
    })
  }
  // activeViewAccountPage
  activeViewAccountPage = () => {
    this.setState({
      pageDisplay: {
        ...this.state.pageDisplay,
        viewAccountPage: true, viewFannyPackPage: false
      }
    })
  }
  // Raaar
  render() {
    // Which content to show
    let showPage, pageName;
    if (this.state.pageDisplay.viewAccountPage === true) {
      // Account page
      pageName = "Account page";
      showPage = <ViewAccount />;
    } else if (this.state.pageDisplay.viewFannyPackPage === true) {
      // FannyPack page
      pageName = "FannyPack page";
      showPage = <ViewFannyPack />;
    } else {
      // FannyPack page
      pageName = "FannyPack page";
      showPage = <ViewFannyPack />;
    }
    return (
      <div id="Content" className="container">
        <p>
          {this.props.activeUser} _ {this.props.activeFannyPackName} _ {this.props.activeFannyPack}
        </p>

        <button className="btn" onClick={this.activeViewFannyPackPage}>activeViewFannyPackPage</button>
        <button className="btn" onClick={this.activeViewAccountPage}>activeViewAccountPage</button>

        {showPage}
      </div>
    );
  }
}
export default Content;
