/*
Dashboard Page

-- PageMessage_Alert
-- pageDisplay
  - FannyPack_page
  - Users_Page
  
*/ 
// Page-Redirect
import React, { Component } from 'react';
// Navigation and Messages
import Navigation from '../../component/Navigation';
import MessageAlert from '../../component/MessageAlert';
// Contents 
import FannyPack from './fannyPack';
import User from './users';
// Dashboard
class Dashboard extends Component {
  // constructor
  constructor(props) {
    super(props);
    // Message Alert
    const messageAlert = {
      message: "FannyPack - Dashboard",
      messageHistory: [{
        time: "",
        message: ""
      }]
    };
    // PageDisplay Setting
    const pageDisplay = {
      fannyPackPage: true,
      userPage: false
    };
    // State
    this.state = {
      messageAlert: messageAlert,
      pageDisplay: pageDisplay,
      alertMessage: "fannyPackPage - Alert Message"
    };
  }
  // Alert Message 
  // updateAlertMessage
  updateAlertMessage = (msg) => {
    console.log("updateAlertMessage: " + JSON.stringify(msg));
    this.setState({ alertMessage: msg })
  }
  // Pages
  // - FannyPack | Users
  // 
  // activeFannyPack 
  activeFannyPack = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        fannyPackPage: true, userPage: false
      }
    })
  }
  // activeUsers
  activeUsers = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        fannyPackPage: false, userPage: true
      }
    })
  }
  //
  // blaze contents
  render() {
    // Which content to show
    let showPage, pageName;
    if (this.state.pageDisplay.fannyPackPage === true) {
      // FannyPack page
      pageName = "FannyPack page";
      showPage = <FannyPack
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    } else if (this.state.pageDisplay.userPage === true) {
      // User page
      pageName = "User page";
      showPage = <User
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    } else {
      // FannyPack page
      pageName = "FannyPack page";
      showPage = <FannyPack
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    }
    // 
    // #brrrrrom
    return ( 
      <div className="h-100 w-100">
        {/* Navigation */}
        <Navigation
          alertMessage={this.state.alertMessage}
          activeFannyPack={this.activeFannyPack}
          activeUsers={this.activeUsers}
          pageName={pageName} />
        {/* Alert Message */}
        <MessageAlert alertMessage={this.state.alertMessage} />
        {/* Page content */}
        {showPage}
      </div>
    );
  }
}
// Bling
export default Dashboard;



