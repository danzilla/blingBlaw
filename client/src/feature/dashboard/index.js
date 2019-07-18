// Dashboard 
// Page-Redirect
import React, { Component } from 'react';
// Navigation and Messages
import Navigation from '../../component/Navigation';
import MessageAlert from '../../component/MessageAlert';
// Contents 
import FannyPack from './fannyPack';
import Category from './category';
import User from './users';
// Dashboard
class Dashboard extends Component {
  // constructor
  constructor(props) {
    super(props);
    // Page-Display Setting
    const pageDisplay = {
      fannyPackPage: true,
      categoryPage: false,
      userPage: false
    };
    const alertMessage = { 
      fannyPackPage: "fannyPackPage - Alert Message"
    };
    this.state = {
      pageDisplay: pageDisplay,
      alertMessage: alertMessage
    };
  }
  // Alert Message 
  // updateAlertMessage
  updateAlertMessage = (msg) => {
    this.setState({ alertMessage: msg })
  }
  // Pages
  // - FannyPack | Category | Users
  // - 3 Depth - Props -> nav > navBar
  // 
  // activeFannyPack 
  activeFannyPack = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        fannyPackPage: true, categoryPage: false, userPage: false
      }
    })
  }
  // activeCategory 
  activeCategory = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        fannyPackPage: false, categoryPage: true, userPage: false
      }
    })
  }
  // activeUsers
  activeUsers = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        fannyPackPage: false, categoryPage: false, userPage: true
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
    } else if (this.state.pageDisplay.categoryPage === true) {
      // Category page
      pageName = "Labels and Category page";
      showPage = <Category
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
          activeCategory={this.activeCategory}
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



