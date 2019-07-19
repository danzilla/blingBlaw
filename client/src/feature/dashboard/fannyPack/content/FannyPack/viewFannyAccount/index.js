import React, { Component } from 'react';

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
  // Raaar
  render() {
    return (
      <div className="container">
        <ViewFannyPack
          activeShowAccount={this.props.activeShowAccount}
          activeShowFannyPack={this.props.activeShowFannyPack}
          
          getUserFannyPack={this.props.getUserFannyPack}
          updateAlertMessage={this.props.updateAlertMessage}
          changeActiveFannyPack={this.props.changeActiveFannyPack}
          userFannyPackz={this.props.userFannyPackz}
          activeFannyPackName={this.props.activeFannyPackName}
          activeFannyPack={this.props.activeFannyPack}
          activeUser={this.props.activeUser}
          pageName={this.props.pageName} />    

      </div>
    );
  }
}
export default Content;
