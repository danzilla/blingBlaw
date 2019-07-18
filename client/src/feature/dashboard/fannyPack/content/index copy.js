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
      showPage = <ViewAccount
        activeFannyPackName={this.props.activeFannyPackName}
        activeFannyPack={this.props.activeFannyPack}
        activeUser={this.props.activeUser} />;
    } else if (this.state.pageDisplay.viewFannyPackPage === true) {
      // FannyPack page
      pageName = "FannyPack page";
      showPage = <ViewFannyPack
        activeFannyPackName={this.props.activeFannyPackName}
        activeFannyPack={this.props.activeFannyPack}
        activeUser={this.props.activeUser} />;
    } else {
      // FannyPack page
      pageName = "FannyPack page";
      showPage = <ViewFannyPack
        activeFannyPackName={this.props.activeFannyPackName}
        activeFannyPack={this.props.activeFannyPack}
        activeUser={this.props.activeUser} />;
    }
    return (
      <div className="container h-100">
        <button className="btn" onClick={this.activeViewFannyPackPage}>activeViewFannyPackPage</button>
        <button className="btn" onClick={this.activeViewAccountPage}>activeViewAccountPage</button>
        {showPage}
        {showPage}
        {showPage}
        {showPage}
      </div>
    );
  }
}
export default Content;
